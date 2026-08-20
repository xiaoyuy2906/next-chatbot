

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


export interface Config {
  apiBase: string,
  defaultModel: string,
  apiKey: string,
  temperature: number,
  topP: number,
  frequencyPenalty: number,
  maxCompletionTokens: number,
  reasoningEffort: 'low' | 'medium' | 'high',
}