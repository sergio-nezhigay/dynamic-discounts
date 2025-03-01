import { processWebhook } from "../utils/webhookUtils";
import db from "../db.server";

export const action = async ({ request }) => {
  return processWebhook(request, async ({ session, shop }) => {
    if (session) {
      await db.session.deleteMany({ where: { shop } });
    }
  });
};
