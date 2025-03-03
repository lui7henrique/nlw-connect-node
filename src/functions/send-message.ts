type SendMessageParams = { 
  message: string;
};

export async function sendMessage({ message }: SendMessageParams) {
  return message;
}
