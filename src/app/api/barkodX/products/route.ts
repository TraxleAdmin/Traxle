import { barkodxOptions, getBarkodxProducts, postBarkodxProducts } from '@/lib/barkodx-relay';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = getBarkodxProducts;
export const POST = postBarkodxProducts;
export const OPTIONS = barkodxOptions;
