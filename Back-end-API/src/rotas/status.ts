import { CORS_HEADERS } from "../main";

export async function getStatus() {
  return new Response(JSON.stringify({ status: "ok" }), {
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    },
  });
}