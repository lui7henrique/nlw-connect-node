import { tool } from 'ai'
import { z } from 'zod'
import { redis } from '../../redis/client'

export const redisTool = tool({
  description: `
    READ-ONLY tool to retrieve data from Redis about the referral system.
    
    Available keys for reading:
    - referral:ranking - A sorted set containing the total number of invites/referrals per subscriber
    - referral:access-count - Total number of clicks/accesses to invite links

    Examples:
    - To get referral ranking: "referral:ranking"
    - To get total access count: "referral:access-count"

    Note: Only read operations are allowed. No writing or modifying data.
  `,
  parameters: z.object({
    command: z
      .string()
      .describe('The command to execute, for example GET, HGET, ZREVRANGE.'),
    args: z.array(z.string()).describe('The arguments to pass to the command'),
  }),
  execute: async ({ command, args }) => {
    console.log({ command, args })
    const result = await redis.call(command, ...args)
    return JSON.stringify(result)
  },
})
