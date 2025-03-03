import { tool } from 'ai'
import z from 'zod'
import { pg } from '../../drizzle/client'

export const postgresTool = tool({
  // TODO: Automatically generate table schema
  description: `
    Query the database to get data. ONLY SELECT operations are allowed.

    Available tables:

    TABLE: subscriptions
    - id (uuid, primary key)
    - name (text)
    - email (text, unique)
    - created_at (timestamp)

    Example: SELECT * FROM subscriptions WHERE email = 'example@email.com'
  `,
  parameters: z.object({
    query: z.string().describe('The query to execute'),
    params: z.array(z.string()).describe('The parameters to pass to the query'),
  }),
  execute: async ({ query, params }) => {
    console.log({ query, params })

    const result = await pg.unsafe(query, params)
    return JSON.stringify(result)
  },
})
