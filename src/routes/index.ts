import type { FastifyInstance } from "fastify";
import { subscribeToEventRoute } from "./subscribe-to-event";
import { accessInviteLinkRoute } from "./access-invite-link";

export const routes = (app: FastifyInstance) => {
  app.register(subscribeToEventRoute);
  app.register(accessInviteLinkRoute);
};
