import { barkodxOptions, getBarkodxLabelJobs, postBarkodxLabelJobs } from '@/lib/barkodx-relay';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = getBarkodxLabelJobs;
export const POST = postBarkodxLabelJobs;
export const OPTIONS = barkodxOptions;
