import { NextRequest, NextResponse } from "next/server";

const BARKODX_RELAY_BASE_URL = process.env.BARKODX_RELAY_BASE_URL?.trim();

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
};

function withCors(response: NextResponse): NextResponse {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

function relayUnavailableResponse(): NextResponse {
  return withCors(
    NextResponse.json(
      {
        ok: false,
        error: "BarkodX relay is not configured.",
        detail: "Set BARKODX_RELAY_BASE_URL to enable relay forwarding.",
      },
      { status: 503 },
    ),
  );
}

async function relayToUpstream(req: NextRequest, path: string, method: "GET" | "POST"): Promise<NextResponse> {
  if (!BARKODX_RELAY_BASE_URL) {
    return relayUnavailableResponse();
  }

  const base = BARKODX_RELAY_BASE_URL.endsWith("/") ? BARKODX_RELAY_BASE_URL.slice(0, -1) : BARKODX_RELAY_BASE_URL;
  const search = req.nextUrl.search || "";
  const upstreamUrl = `${base}${path}${search}`;

  try {
    const headers = new Headers();
    const contentType = req.headers.get("content-type");
    const authorization = req.headers.get("authorization");

    if (contentType) headers.set("content-type", contentType);
    if (authorization) headers.set("authorization", authorization);

    const init: RequestInit = {
      method,
      headers,
      cache: "no-store",
    };

    if (method === "POST") {
      init.body = await req.text();
    }

    const upstreamRes = await fetch(upstreamUrl, init);
    const body = await upstreamRes.text();

    const response = new NextResponse(body, {
      status: upstreamRes.status,
      headers: {
        "content-type": upstreamRes.headers.get("content-type") ?? "application/json; charset=utf-8",
      },
    });

    return withCors(response);
  } catch {
    return withCors(
      NextResponse.json(
        {
          ok: false,
          error: "Failed to connect BarkodX relay upstream.",
        },
        { status: 502 },
      ),
    );
  }
}

export function barkodxOptions(): NextResponse {
  return withCors(new NextResponse(null, { status: 204 }));
}

export function getBarkodxStatus(req: NextRequest): Promise<NextResponse> {
  return relayToUpstream(req, "/status", "GET");
}

export function getBarkodxChanges(req: NextRequest): Promise<NextResponse> {
  return relayToUpstream(req, "/changes", "GET");
}

export function postBarkodxChanges(req: NextRequest): Promise<NextResponse> {
  return relayToUpstream(req, "/changes", "POST");
}

export function getBarkodxLabelJobs(req: NextRequest): Promise<NextResponse> {
  return relayToUpstream(req, "/label-jobs", "GET");
}

export function postBarkodxLabelJobs(req: NextRequest): Promise<NextResponse> {
  return relayToUpstream(req, "/label-jobs", "POST");
}

export function getBarkodxProducts(req: NextRequest): Promise<NextResponse> {
  return relayToUpstream(req, "/products", "GET");
}

export function postBarkodxProducts(req: NextRequest): Promise<NextResponse> {
  return relayToUpstream(req, "/products", "POST");
}
