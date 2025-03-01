import crypto from "crypto";

// Function to verify Shopify webhook HMAC signature
export function verifyShopifyWebhook(request, shopifySecret) {
  const hmac = request.headers.get("X-Shopify-Hmac-Sha256");
  if (!hmac) return false;

  // Read raw request body
  return request.text().then((body) => {
    const generatedHash = crypto
      .createHmac("sha256", shopifySecret)
      .update(body, "utf8")
      .digest("base64");

    return crypto.timingSafeEqual(
      Buffer.from(generatedHash, "utf8"),
      Buffer.from(hmac, "utf8"),
    );
  });
}
