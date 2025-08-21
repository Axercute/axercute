// +server.js
import fetch from "node-fetch";

export async function GET() {
  const res = await fetch("https://www.coinpayments.net/index.php?cmd=checkout&id=CPJH23B3C3IETTLNTBHCK8JXED&key=0182528b69c5326ad27b8bebf525982a");
  const text = await res.text();

  return new Response(text, {
    headers: {
      "Content-Type": "application/javascript"
    }
  });
}
