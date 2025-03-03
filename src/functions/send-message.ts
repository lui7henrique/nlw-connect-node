import { generateText, tool } from 'ai'
import { openai } from '../ai/openai'
import { postgresTool } from '../ai/tools/postgres-tool'

type SendMessageParams = {
  message: string
}

export async function sendMessage({ message }: SendMessageParams) {
  const anwser = await generateText({
    model: openai,
    prompt: message,
    tools: {
      postgresTool,
    },
    system: `      
      You are a AI assistant, responsible for answering questions about a programming event.  

      IMPORTANT: 
      - Includes in your only what is asked, without any additional text.
      - The return should be in Markdown format (without \`\`\` in the beginning and end of the response).
      - Do not add any greetings, explanations, or additional context.
      - Do not add any prefixes or suffixes to your response.
    `,
    maxSteps: 5, // Max steps to use tools
  })

  return {
    response: anwser.text,
  }
}
