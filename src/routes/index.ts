import type { FastifyInstance } from "fastify";

import { subscribeToEventRoute } from "./subscribe-to-event";
import { accessInviteLinkRoute } from "./access-invite-link";
import { getSubscriberInviteClicksRoute } from "./get-subscriber-invite-clicks";
import { getSubscriberInvitesCountRoute } from "./get-subscriber-invites-count";
import { getSubscriberRankingPositionRoute } from "./get-subscriber-ranking-position";

export const routes = (app: FastifyInstance) => {
  app.register(subscribeToEventRoute);
  app.register(accessInviteLinkRoute);
  app.register(getSubscriberInviteClicksRoute);
  app.register(getSubscriberInvitesCountRoute);
  app.register(getSubscriberRankingPositionRoute);
};
