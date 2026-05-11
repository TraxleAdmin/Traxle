import { barkodxOptions, getBarkodxStatus } from '@/lib/barkodx-relay';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = getBarkodxStatus;
export const OPTIONS = barkodxOptions;
