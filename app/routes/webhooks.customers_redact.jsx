import { processWebhook } from "../utils/webhookUtils";

export const action = async ({ request }) => {
  return processWebhook(request, async ({ payload }) => {
    console.log("Processing customers/redact webhook:", payload);
  });
};
