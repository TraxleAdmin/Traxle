import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import fs from 'node:fs/promises';
import path from 'node:path';
import { adminDb } from '@/lib/firebase-admin';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-barkodx-token',
};

const MAX_CHANGES_PER_REQUEST = 2000;
const MAX_PRODUCTS_PER_REQUEST = 5000;
const MAX_PRODUCTS_PER_RESPONSE = 10000;

type RelayProduct = {
  barcode: string;
  name: string;
  price: number;
  stock: number;
  crazyCardPrice?: number;
  updatedAt: string;
};

type RelayChange = {
  sequence: number;
  sourceSequence?: number;
  barcode: string;
  name: string;
  previousPrice?: number;
  nextPrice?: number;
  previousCrazyCardPrice?: number;
  nextCrazyCardPrice?: number;
  previousStock?: number;
  nextStock?: number;
  changedAt: string;
  product: RelayProduct;
};

type NormalizedChange = {
  change: Record<string, unknown>;
  product: RelayProduct;
};

type CatalogManifest = {
  version: 1;
  createdAt: string;
  updatedAt: string;
  productCount: number;
  chunkSize: number;
  chunkCount: number;
  sequence: number;
};

const json = (payload: unknown, init?: ResponseInit) =>
  NextResponse.json(payload, {
    ...init,
    headers: {
      ...CORS_HEADERS,
      ...(init?.headers ?? {}),
    },
  });

export const barkodxOptions = () => new NextResponse(null, { status: 204, headers: CORS_HEADERS });

const requireDb = () => {
  if (!adminDb) {
    throw new Error('Firebase Admin baglantisi yok. Traxle ortam degiskenleri kontrol edilmeli.');
  }

  return adminDb;
};

const refs = () => {
  const db = requireDb();
  const stateRef = db.collection('barkodxRelay').doc('default');

  return {
    db,
    stateRef,
    productsRef: stateRef.collection('products'),
    changesRef: stateRef.collection('changes'),
    importsRef: stateRef.collection('imports'),
  };
};

const storageBucket = () => {
  const bucketName = process.env.FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

  if (!bucketName) {
    return undefined;
  }

  return admin.storage().bucket(bucketName);
};

const readLocalJson = async <T,>(filePath: string): Promise<T | undefined> => {
  try {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    return JSON.parse(await fs.readFile(fullPath, 'utf8')) as T;
  } catch {
    return undefined;
  }
};

const readStorageJson = async <T,>(filePath: string): Promise<T | undefined> => {
  const bucket = storageBucket();

  if (!bucket) {
    return undefined;
  }

  try {
    const [buffer] = await bucket.file(filePath).download();
    return JSON.parse(buffer.toString('utf8')) as T;
  } catch {
    return undefined;
  }
};

const readCatalogManifest = async () =>
  (await readStorageJson<CatalogManifest>('barkodxRelay/catalog/manifest.json')) ??
  (await readLocalJson<CatalogManifest>('barkodx/catalog/manifest.json'));

const readCatalogChunk = async (index: number) =>
  (await readStorageJson<{ products: RelayProduct[] }>(`barkodxRelay/catalog/chunks/${String(index).padStart(4, '0')}.json`)) ??
  (await readLocalJson<{ products: RelayProduct[] }>(`barkodx/catalog/chunks/${String(index).padStart(4, '0')}.json`));

const readAuthToken = (request: Request) => {
  const authHeader = request.headers.get('authorization') ?? '';
  const requestUrl = new URL(request.url);

  return (
    request.headers.get('x-barkodx-token') ||
    authHeader.replace(/^Bearer\s+/i, '') ||
    requestUrl.searchParams.get('token') ||
    ''
  ).trim();
};

const ensureReadAuth = (request: Request) => {
  const token = process.env.BARKODX_RELAY_READ_TOKEN || '';

  if (token && readAuthToken(request) !== token) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  return undefined;
};

const ensureWriteAuth = (request: Request) => {
  const sharedToken = process.env.BARKODX_RELAY_TOKEN || process.env.JWT_SECRET || '';
  const token = process.env.BARKODX_RELAY_WRITE_TOKEN || sharedToken;

  if (!token) {
    return json({ error: 'BARKODX_RELAY_WRITE_TOKEN ayarlanmamis.' }, { status: 500 });
  }

  if (readAuthToken(request) !== token) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  return undefined;
};

const parseNumber = (value: unknown) => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }

  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const trimmed = String(value).trim();
  const lastComma = trimmed.lastIndexOf(',');
  const lastDot = trimmed.lastIndexOf('.');
  const normalized =
    lastComma >= 0 && lastDot >= 0
      ? lastComma > lastDot
        ? trimmed.replace(/\./g, '').replace(',', '.')
        : trimmed.replace(/,/g, '')
      : trimmed.replace(',', '.');
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : undefined;
};

const cleanFirestoreData = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(cleanFirestoreData);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, item]) => item !== undefined)
        .map(([key, item]) => [key, cleanFirestoreData(item)]),
    );
  }

  return value;
};

const normalizeProduct = (value: unknown): RelayProduct | undefined => {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const raw = value as Record<string, unknown>;
  const barcode = String(raw.barcode ?? '').trim();
  const name = String(raw.name ?? '').trim();
  const price = parseNumber(raw.price);

  if (!barcode || !name || price === undefined || price < 0) {
    return undefined;
  }

  const stock = parseNumber(raw.stock);
  const crazyCardPrice = parseNumber(raw.crazyCardPrice);

  return {
    barcode,
    name,
    price,
    stock: stock === undefined ? 0 : Math.max(0, Math.round(stock)),
    crazyCardPrice,
    updatedAt: typeof raw.updatedAt === 'string' && raw.updatedAt ? raw.updatedAt : new Date().toISOString(),
  };
};

const productFromChange = (value: unknown) => {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const change = value as Record<string, unknown>;
  const directProduct = normalizeProduct(change.product);

  if (directProduct) {
    return directProduct;
  }

  return normalizeProduct({
    barcode: change.barcode,
    name: change.name,
    price: change.nextPrice,
    stock: change.nextStock,
    crazyCardPrice: change.nextCrazyCardPrice,
    updatedAt: change.changedAt,
  });
};

const safeDocId = (value: string) => Buffer.from(value, 'utf8').toString('base64url');

const sequenceDocId = (sequence: number) => sequence.toString().padStart(16, '0');

const cleanLimit = (value: string | null, fallback: number, max: number) => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.min(max, parsed);
};

const cleanSequence = (value: string | null) => {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed >= 0 ? parsed : 0;
};

const commitBatches = async (
  db: FirebaseFirestore.Firestore,
  writes: Array<(batch: FirebaseFirestore.WriteBatch) => void>,
) => {
  for (let index = 0; index < writes.length; index += 450) {
    const batch = db.batch();
    writes.slice(index, index + 450).forEach(write => write(batch));
    await batch.commit();
  }
};

const statePayload = (data: FirebaseFirestore.DocumentData | undefined, latestChange?: RelayChange) => ({
  app: 'BarkodX Bridge',
  ok: true,
  mode: 'traxle-cloud-relay',
  startedAt: data?.startedAt ?? data?.updatedAt ?? new Date().toISOString(),
  updatedAt: data?.updatedAt ?? '',
  productCount: Number(data?.productCount ?? 0),
  lastSequence: Number(data?.lastSequence ?? 0),
  latestChangeAt: latestChange?.changedAt,
  source: {
    type: 'cloud-relay',
    name: 'Traxle BarkodX Relay',
    target: 'https://www.traxleapp.com/api/barkodX',
  },
  warnings: [],
});

export async function getBarkodxStatus(request: Request) {
  const authError = ensureReadAuth(request);
  if (authError) return authError;

  try {
    const { stateRef, changesRef } = refs();
    const [stateSnap, latestSnap] = await Promise.all([
      stateRef.get(),
      changesRef.orderBy('sequence', 'desc').limit(1).get(),
    ]);
    const latestChange = latestSnap.docs[0]?.data() as RelayChange | undefined;
    const manifest = await readCatalogManifest();

    const payload = statePayload(stateSnap.data(), latestChange);
    if (manifest) {
      payload.productCount = manifest.productCount;
      payload.updatedAt = manifest.updatedAt || payload.updatedAt;
    }

    return json(payload);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Status okunamadi.' }, { status: 500 });
  }
}

export async function getBarkodxChanges(request: Request) {
  const authError = ensureReadAuth(request);
  if (authError) return authError;

  try {
    const requestUrl = new URL(request.url);
    const sinceSequence = cleanSequence(requestUrl.searchParams.get('sinceSequence'));
    const limit = cleanLimit(requestUrl.searchParams.get('limit'), MAX_PRODUCTS_PER_REQUEST, MAX_PRODUCTS_PER_REQUEST);
    const { stateRef, changesRef } = refs();
    const [stateSnap, changesSnap] = await Promise.all([
      stateRef.get(),
      changesRef.where('sequence', '>', sinceSequence).orderBy('sequence', 'asc').limit(limit).get(),
    ]);
    const state = stateSnap.data();

    return json({
      app: 'BarkodX Bridge',
      version: 1,
      sinceSequence,
      latestSequence: Number(state?.lastSequence ?? sinceSequence),
      changes: changesSnap.docs.map(doc => doc.data()),
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Degisiklikler okunamadi.' }, { status: 500 });
  }
}

export async function postBarkodxChanges(request: Request) {
  const authError = ensureWriteAuth(request);
  if (authError) return authError;

  try {
    const payload = await request.json();
    const incomingChanges: unknown[] = Array.isArray(payload?.changes)
      ? payload.changes.slice(0, MAX_CHANGES_PER_REQUEST)
      : [];
    const { db, stateRef, productsRef, changesRef, importsRef } = refs();
    const normalized = incomingChanges
      .map((change: unknown) => ({ change: change as Record<string, unknown>, product: productFromChange(change) }))
      .filter((item): item is NormalizedChange => Boolean(item.product));

    const stateSnap = await stateRef.get();
    const state = stateSnap.data();
    let lastSequence = Number(state?.lastSequence ?? 0);
    let newProductCount = Number(state?.productCount ?? 0);
    const productRefs = normalized.map(item => productsRef.doc(safeDocId(item.product!.barcode)));
    const existingProducts = productRefs.length ? await db.getAll(...productRefs) : [];
    const now = new Date().toISOString();
    const writes: Array<(batch: FirebaseFirestore.WriteBatch) => void> = [];

    normalized.forEach((item, index) => {
      const product = item.product!;
      const incoming = item.change;
      const existing = existingProducts[index];

      if (!existing?.exists) {
        newProductCount += 1;
      }

      lastSequence += 1;
      const previousProduct = existing?.data() as RelayProduct | undefined;
      const relayChange: RelayChange = {
        sequence: lastSequence,
        sourceSequence: parseNumber(incoming.sequence),
        barcode: product.barcode,
        name: product.name,
        previousPrice: parseNumber(incoming.previousPrice) ?? previousProduct?.price,
        nextPrice: product.price,
        previousCrazyCardPrice: parseNumber(incoming.previousCrazyCardPrice) ?? previousProduct?.crazyCardPrice,
        nextCrazyCardPrice: product.crazyCardPrice,
        previousStock: parseNumber(incoming.previousStock) ?? previousProduct?.stock,
        nextStock: product.stock,
        changedAt: typeof incoming.changedAt === 'string' && incoming.changedAt ? incoming.changedAt : product.updatedAt,
        product,
      };

      writes.push(batch => batch.set(productRefs[index], cleanFirestoreData(product) as FirebaseFirestore.DocumentData, { merge: true }));
      writes.push(batch =>
        batch.set(
          changesRef.doc(sequenceDocId(relayChange.sequence)),
          cleanFirestoreData(relayChange) as FirebaseFirestore.DocumentData,
        ),
      );
    });

    writes.push(batch =>
      batch.set(
        stateRef,
        {
          startedAt: state?.startedAt ?? now,
          updatedAt: now,
          productCount: newProductCount,
          lastSequence,
        },
        { merge: true },
      ),
    );
    writes.push(batch =>
      batch.set(importsRef.doc(now.replace(/[^\d]/g, '')), {
        source: payload?.source ?? '',
        sentAt: payload?.sentAt ?? '',
        receivedAt: now,
        changes: incomingChanges.length,
        accepted: normalized.length,
        skipped: incomingChanges.length - normalized.length,
      }),
    );

    await commitBatches(db, writes);

    return json({
      ok: true,
      accepted: normalized.length,
      skipped: incomingChanges.length - normalized.length,
      latestSequence: lastSequence,
      productCount: newProductCount,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Degisiklikler kaydedilemedi.' }, { status: 500 });
  }
}

export async function getBarkodxProducts(request: Request) {
  const authError = ensureReadAuth(request);
  if (authError) return authError;

  try {
    const requestUrl = new URL(request.url);
    const limit = cleanLimit(requestUrl.searchParams.get('limit'), 5000, MAX_PRODUCTS_PER_RESPONSE);
    const after = requestUrl.searchParams.get('after');
    const { stateRef, productsRef } = refs();
    const manifest = await readCatalogManifest();

    if (manifest) {
      const chunkIndex = after?.startsWith('chunk:')
        ? Math.max(0, Number(after.replace('chunk:', '')))
        : 0;
      const safeChunkIndex = Number.isInteger(chunkIndex) ? chunkIndex : 0;
      const chunk = await readCatalogChunk(safeChunkIndex);
      const products = chunk?.products ?? [];

      return json({
        app: 'BarkodX',
        version: 1,
        createdAt: manifest.createdAt,
        sequence: manifest.sequence,
        products: products.slice(0, limit),
        nextCursor: safeChunkIndex + 1 < manifest.chunkCount ? `chunk:${safeChunkIndex + 1}` : undefined,
      });
    }

    const query = after
      ? productsRef.where('barcode', '>', after).orderBy('barcode', 'asc').limit(limit)
      : productsRef.orderBy('barcode', 'asc').limit(limit);
    const [stateSnap, productsSnap] = await Promise.all([stateRef.get(), query.get()]);
    const products = productsSnap.docs.map(doc => doc.data());
    const lastProduct = products[products.length - 1] as RelayProduct | undefined;

    return json({
      app: 'BarkodX',
      version: 1,
      createdAt: new Date().toISOString(),
      sequence: Number(stateSnap.data()?.lastSequence ?? 0),
      products,
      nextCursor: products.length === limit ? lastProduct?.barcode : undefined,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Urunler okunamadi.' }, { status: 500 });
  }
}

export async function postBarkodxProducts(request: Request) {
  const authError = ensureWriteAuth(request);
  if (authError) return authError;

  try {
    const payload = await request.json();
    const incomingProducts: unknown[] = Array.isArray(payload?.products)
      ? payload.products.slice(0, MAX_PRODUCTS_PER_REQUEST)
      : [];
    const { db, stateRef, productsRef, importsRef } = refs();
    const products = incomingProducts.map(normalizeProduct).filter((product): product is RelayProduct => Boolean(product));
    const stateSnap = await stateRef.get();
    const state = stateSnap.data();
    const productRefs = products.map(product => productsRef.doc(safeDocId(product.barcode)));
    const existingProducts = productRefs.length ? await db.getAll(...productRefs) : [];
    const newProducts = existingProducts.filter(doc => !doc.exists).length;
    const now = new Date().toISOString();
    const productCount = Number(state?.productCount ?? 0) + newProducts;
    const writes: Array<(batch: FirebaseFirestore.WriteBatch) => void> = [];

    products.forEach((product, index) => {
      writes.push(batch => batch.set(productRefs[index], cleanFirestoreData(product) as FirebaseFirestore.DocumentData, { merge: true }));
    });
    writes.push(batch =>
      batch.set(
        stateRef,
        {
          startedAt: state?.startedAt ?? now,
          updatedAt: now,
          productCount,
          lastSequence: Number(state?.lastSequence ?? 0),
        },
        { merge: true },
      ),
    );
    writes.push(batch =>
      batch.set(importsRef.doc(now.replace(/[^\d]/g, '')), {
        source: payload?.source ?? '',
        sentAt: payload?.sentAt ?? '',
        receivedAt: now,
        catalogProducts: incomingProducts.length,
        accepted: products.length,
        skipped: incomingProducts.length - products.length,
      }),
    );

    await commitBatches(db, writes);

    return json({
      ok: true,
      accepted: products.length,
      skipped: incomingProducts.length - products.length,
      productCount,
      latestSequence: Number(state?.lastSequence ?? 0),
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Urunler kaydedilemedi.' }, { status: 500 });
  }
}
