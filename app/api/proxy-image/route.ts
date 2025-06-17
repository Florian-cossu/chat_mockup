import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    // Basic validation
    if (!url) {
      return new Response("Missing URL", { status: 400 });
    }

    // Only allow http(s)
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return new Response("Invalid protocol", { status: 400 });
    }

    // Only allow jpg/jpeg extensions — case-insensitive
    if (!url.toLowerCase().endsWith(".jpg") && !url.toLowerCase().endsWith(".jpeg")) {
      return new Response("Only .jpg/.jpeg files allowed", { status: 400 });
    }

    // Prevent SSRF: allow only public hostnames (optional)
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    // Example: block private IPs — VERY BASIC (improve for prod!)
    if (
      hostname === "localhost" ||
      hostname.startsWith("127.") ||
      hostname.startsWith("0.") ||
      hostname.endsWith(".internal") ||
      hostname.endsWith(".local")
    ) {
      return new Response("Blocked hostname", { status: 400 });
    }

    // Time out & limit size (optional, more robust with a custom fetch lib)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return new Response("Upstream fetch failed", { status: 502 });
    }

    // Verify MIME type — must be image/jpeg
    const contentType = response.headers.get("Content-Type") || "";
    if (!contentType.startsWith("image/jpeg")) {
      return new Response("Invalid content type", { status: 400 });
    }

    // Fetch raw bytes & relay them
    const blob = await response.arrayBuffer();

    return new Response(blob, {
      headers: {
        "Content-Type": "image/jpeg",
        // Encourage clients to cache safely (optional)
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (err) {
    if ((err as any).name === "AbortError") {
      return new Response("Upstream request timed out", { status: 504 });
    }
    console.error("Proxy error:", err);
    return new Response("Internal error", { status: 500 });
  }
}
