

export type Chat = {
  chatId: string,
  model: string,
  title: string | null,
  lastModified: string,
  messages: Message[],
}

export interface Message {
  role: 'user' | 'assistant' | 'system',
  content: string,
}

