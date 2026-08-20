import { makeAutoObservable, autorun } from "mobx"
import { type Chat, type Message } from "./types.ts"
import axios from "axios"
import { defaultTheme } from "antd/es/theme/context"



class ConversationHistory {
  chats: Chat[] = [
    {
      chatId: '3phyqunbcci',
      model: "deepseek-v4-flash",
      lastModified: '2026-08-12T20:16:01.733Z',
      title: '',
      messages: [
        {
          role: "user",
          content: "Hello"
        },
        {
          role: "assistant", content: "Hello!"
        },
        {
          role: "user",
          content: "Can you describe LLMs to me?"
        },
        {
          role: 'assistant',
          content: `Large Language Models (LLMs) are a type of artificial intelligence model designed to understand and generate human language. Here's a concise breakdown:

---

### 🧠 What They Are
LLMs are **deep learning models** trained on massive amounts of text data. They learn statistical patterns in language to predict, generate, and understand text.

---

### ⚙️ How They Work
- Built on the **Transformer architecture** (introduced in the 2017 paper *"Attention Is All You Need"*).
- Use a mechanism called **self-attention** to weigh the relevance of different words in a sequence relative to each other.
- Trained using **unsupervised or semi-supervised learning** on large text corpora (books, websites, code, etc.).
- Fine-tuned with techniques like **RLHF (Reinforcement Learning from Human Feedback)** to align with human preferences.

---

### 📏 Scale
The "large" in LLMs refers to:
- **Billions to trillions of parameters** (learnable weights).
- Training on **terabytes of text data**.
- Requiring significant **compute resources** (GPUs/TPUs).

---

### 💡 Capabilities
LLMs can:
- Generate coherent, contextual text
- Answer questions and summarize documents
- Translate languages
- Write and debug code
- Reason through multi-step problems

---

### 🔍 Popular Examples
| Model | Creator |
|-------|---------|
| GPT-4 | OpenAI |
| Claude | Anthropic |
| Gemini | Google DeepMind |
| LLaMA | Meta AI |

---

### ⚠️ Limitations
- Can **hallucinate** (generate plausible but false information)
- Have a **knowledge cutoff** date
- Can reflect **biases** present in training data
- Lack true **reasoning or understanding** in a human sense

---

Would you like to dive deeper into any specific aspect, such as the Transformer architecture, training process, or use cases?`
        }

      ]
    },
    {
      chatId: 'zk3jf82hx1p',
      model: "claude-haiku-4-5",
      lastModified: '2026-08-10T15:03:44.900Z',
      title: 'Git rebase 冲突处理',
      messages: [
        { role: "user", content: "rebase 的时候冲突了，我现在应该怎么办" },
        {
          role: "assistant",
          content: `按下面步骤处理：

1. \`git status\` 看哪些文件冲突
2. 手动编辑冲突文件，解决 \`<<<<<<<\` \`=======\` \`>>>>>>>\` 标记
3. \`git add <文件>\` 标记已解决
4. \`git rebase --continue\` 继续

如果想放弃这次 rebase：\`git rebase --abort\``
        },
        { role: "user", content: "continue 之后又冲突了一次怎么办" },
        { role: "assistant", content: "正常现象，rebase 是逐个 commit 重放，可能每个 commit 都会冲突一次，重复上面的步骤直到全部完成就行。" }
      ]
    },
    {
      chatId: 'q7wvn0d5tak',
      model: "claude-sonnet-5",
      lastModified: '2026-08-14T08:20:00.000Z',
      title: '',
      messages: []
    }
  ]

  config = {
    apiBase: 'https://ai-gateway.vercel.sh',
    defaultModel: 'deepseek-v4-flash',
    apiKey: '',
    temperature: 2,
    topP: 1,
    frequencyPenalty: 2,
    maxCompletionTokens: 96000,
    reasoningEffort: 'medium',
  }


  constructor() {
    const history = localStorage.getItem("chatHistory")

    if (history) {
      try {
        const chatHistory = JSON.parse(history)
        if (chatHistory.length > 0) {
          this.chats = chatHistory
        }
      } catch {
        // 数据损坏，保留默认数据，不让整个 app 崩溃
      }
    }

    makeAutoObservable(this)
    autorun(() => {
      localStorage.setItem('chatHistory', JSON.stringify(this.chats))
    })
  }


  createNewChat(modelName: string = 'deepseek-v4-flash') {
    const chatItem = {
      chatId: Math.random().toString(36).slice(2),
      model: modelName,
      lastModified: new Date().toISOString(),
      title: 'New Conversation',
      messages: [],
    }
    this.chats.push(chatItem)
    // localStorage.setItem('chatHistory', JSON.stringify(this.chats))
    return {
      modelName: chatItem.model,
      chatId: chatItem.chatId
    }
  }

  addMessage(chatId: string, ...msgs: Message[]) {
    const idx = this.chats.findIndex(chat => chat.chatId == chatId)
    if (idx == -1) {
      return
    }
    const currentChat = this.chats[idx]
    currentChat.messages.push(...msgs)
    currentChat.lastModified = new Date().toISOString()
    // localStorage.setItem('chatHistory', JSON.stringify(this.chats))

  }

  deleteChat(chatId: string) {
    const idx = this.chats.findIndex(chat => chat.chatId == chatId)
    if (idx == -1) {
      return
    }
    this.chats.splice(idx, 1)
    // localStorage.setItem('chatHistory', JSON.stringify(this.chats))
  }


  async getResponse(chatId: string) {
    const idx = this.chats.findIndex(chat => chat.chatId == chatId)
    if (idx == -1) {
      return
    }
    const currentChat = this.chats[idx]
    const { data } = await axios.post('/api/chat', {
      chatId: currentChat.chatId,
      model: currentChat.model,
      messages: currentChat.messages,
    })
    console.log(data)
    this.addMessage(chatId, {
      role: 'assistant',
      content: data[0].text
    })
  }
}

export const conversations = new ConversationHistory()