import type { FastifyInstance } from "fastify";
import { subscribeToEvent } from "./subscribe-to-event";

export const routes = (app: FastifyInstance) => {
  app.register(subscribeToEvent);
};
