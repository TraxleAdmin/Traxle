import { NextResponse } from "next/server";
import * as admin from "firebase-admin";
import { adminDb } from "@/lib/firebase-admin";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
  "Access-Control-Max-Age": "86400",
};

const COLLECTIONS = {
  changes: "barkodx_changes",
  products: "barkodx_products",
  labelJobs: "barkodx_label_jobs",
  status: "barkodx_status",
} as const;

type JsonObject = Record<string, unknown>;

function withCors(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: CORS_HEADERS });
}

function getDb() {
  if (!adminDb) {
    throw new Error("Firebase Admin is not initialized.");
  }
  return adminDb;
}

function parseLimit(request: Request, fallback = 100, max = 500): number {
  const url = new URL(request.url);
  const raw = Number(url.searchParams.get("limit"));
  if (!Number.isFinite(raw) || raw <= 0) return fallback;
  return Math.min(Math.floor(raw), max);
}

function parseId(request: Request): string | null {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  return id && id.trim() ? id.trim() : null;
}

function serializeValue(value: unknown): unknown {
  if (value instanceof admin.firestore.Timestamp) {
    return value.toDate().toISOString();
  }
  if (Array.isArray(value)) {
    return value.map((item) => serializeValue(item));
  }
  if (value && typeof value === "object") {
    const source = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(source)) {
      out[key] = serializeValue(item);
    }
    return out;
  }
  return value;
}

function mapDoc(doc: FirebaseFirestore.DocumentSnapshot) {
  const data = doc.data() ?? {};
  const serialized = serializeValue(data);
  const safeObject =
    serialized && typeof serialized === "object" && !Array.isArray(serialized)
      ? (serialized as Record<string, unknown>)
      : {};
  return { id: doc.id, ...safeObject };
}

async function getCollection(collectionName: string, request: Request) {
  try {
    const db = getDb();
    const id = parseId(request);

    if (id) {
      const snap = await db.collection(collectionName).doc(id).get();
      if (!snap.exists) {
        return withCors({ error: "Not found", id }, 404);
      }
      return withCors(mapDoc(snap));
    }

    const limit = parseLimit(request);
    const snaps = await db.collection(collectionName).limit(limit).get();
    const items = snaps.docs.map((doc) => mapDoc(doc));
    return withCors({ items, count: items.length });
  } catch (error) {
    console.error(`BarkodX GET error (${collectionName}):`, error);
    return withCors({ error: "Failed to fetch data." }, 500);
  }
}

async function postCollection(collectionName: string, request: Request) {
  try {
    const body = (await request.json()) as JsonObject;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return withCors({ error: "Invalid JSON body." }, 400);
    }

    const db = getDb();
    const now = admin.firestore.FieldValue.serverTimestamp();

    const explicitId =
      typeof body.id === "string" && body.id.trim().length > 0 ? body.id.trim() : null;

    if (explicitId) {
      const { id: _id, ...payload } = body;
      await db
        .collection(collectionName)
        .doc(explicitId)
        .set({ ...payload, updatedAt: now }, { merge: true });
      return withCors({ ok: true, id: explicitId, mode: "upsert" }, 200);
    }

    const docRef = await db.collection(collectionName).add({
      ...body,
      createdAt: now,
      updatedAt: now,
    });
    return withCors({ ok: true, id: docRef.id, mode: "create" }, 201);
  } catch (error) {
    console.error(`BarkodX POST error (${collectionName}):`, error);
    return withCors({ error: "Failed to save data." }, 500);
  }
}

export function barkodxOptions() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function getBarkodxChanges(request: Request) {
  return getCollection(COLLECTIONS.changes, request);
}

export async function postBarkodxChanges(request: Request) {
  return postCollection(COLLECTIONS.changes, request);
}

export async function getBarkodxProducts(request: Request) {
  return getCollection(COLLECTIONS.products, request);
}

export async function postBarkodxProducts(request: Request) {
  return postCollection(COLLECTIONS.products, request);
}

export async function getBarkodxLabelJobs(request: Request) {
  return getCollection(COLLECTIONS.labelJobs, request);
}

export async function postBarkodxLabelJobs(request: Request) {
  return postCollection(COLLECTIONS.labelJobs, request);
}

export async function getBarkodxStatus(request: Request) {
  return getCollection(COLLECTIONS.status, request);
}
