import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const subscriptionsRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/subscriptions",
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;

      return reply.status(201).send({
        message: "Subscription created successfully",
      });
    }
  );
};
