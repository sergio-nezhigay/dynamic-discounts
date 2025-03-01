import { processWebhook } from "../utils/webhookUtils";
import db from "../db.server";

export const action = async ({ request }) => {
  return processWebhook(request, async ({ payload, session }) => {
    if (session) {
      const current = payload.current;
      await db.session.update({
        where: {
          id: session.id,
        },
        data: {
          scope: current.toString(),
        },
      });
    }
  });
};
