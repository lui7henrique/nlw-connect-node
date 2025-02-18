import type { FastifyInstance } from "fastify";
import { subscribeToEvent } from "./subscribe-to-event";
import { accessInviteLinkRoute } from "./access-invite-link";

export const routes = (app: FastifyInstance) => {
  app.register(subscribeToEvent);
  app.register(accessInviteLinkRoute);
};
