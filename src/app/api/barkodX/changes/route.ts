import { barkodxOptions, getBarkodxChanges, postBarkodxChanges } from "@/lib/barkodx-relay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = getBarkodxChanges;
export const POST = postBarkodxChanges;
export const OPTIONS = barkodxOptions;
