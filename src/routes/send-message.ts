import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const sendMessageRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/send-message",
    {
      schema: {
        description: "Send a message to AI",
        operationId: "sendMessage",
        body: z.object({
          message: z.string(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { message } = request.body;   

      return reply.status(200).send({
        message,
      });
    } 
  );
};
