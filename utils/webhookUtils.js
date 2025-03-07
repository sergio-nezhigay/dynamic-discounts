import { authenticate } from "../shopify.server";

export const processWebhook = async (request, processPayload) => {
  try {
    const { payload, session, topic, shop } =
      await authenticate.webhook(request);
    console.log(`✅ Verified & Received ${topic} webhook for ${shop}`);

    await processPayload({ payload, session, shop });

    return new Response("Webhook received", { status: 200 });
  } catch (error) {
    console.error("❌ Webhook processing failed, error:", error);
    if (error.message.includes("Invalid HMAC")) {
      console.error("❌ Invalid HMAC:", error);
      return new Response("Unauthorized", { status: 401 });
    }
    console.error(
      "❌ Webhook processing failed, error.message:",
      error.message,
    );

    return new Response("Webhook processing failed", { status: 500 });
  }
};
