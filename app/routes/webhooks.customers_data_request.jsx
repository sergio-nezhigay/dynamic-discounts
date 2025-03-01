import { verifyShopifyWebhook } from "../utils/verifyWebhook";

const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET; // Set in your .env

export const action = async ({ request }) => {
  const isValid = await verifyShopifyWebhook(request, SHOPIFY_API_SECRET);
  if (!isValid) {
    return new Response("Unauthorized", { status: 401 });
  }

  console.log("✅ Valid customers/data_request webhook received.");
  return { success: true };
};
