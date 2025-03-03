import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { sendMessage } from '../functions/send-message'

export const sendMessageRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/send-message',
    {
      schema: {
        description: 'Send a message to AI',
        operationId: 'sendMessage',
        body: z.object({
          message: z.string(),
        }),
        response: {
          200: z.object({
            response: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { message } = request.body
      const response = await sendMessage({ message })

      return reply.status(200).send(response)
    }
  )
}
