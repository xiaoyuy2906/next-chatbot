import { useNavigate, useParams } from "react-router"
import { conversations } from "./store.tsx"
import { CheckCircleFilled, EditFilled, ReloadOutlined, SendOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useRef, useState } from "react"
import type { Message } from "./types.ts"
import { observer } from "mobx-react"
import EmptyComp from "./EmptyComp.tsx"

function useInput(init: string = '') {
  const [value, setValue] = useState(init)

  const onChange = useCallback(function (e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value)
  }, [])

  const clearInput = useCallback(() => { setValue('') }, [])

  return { value, onChange, clearInput }
}



function ChatContentComponent({ idx }: { idx: number }) {
  const params = useParams()
  const currentChat = conversations.chats[idx]
  const textInput = useInput('')
  const displayArea = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (displayArea.current) {
      displayArea.current.scrollTop = displayArea.current.scrollHeight
    }
  }, [currentChat.messages.length])

  async function getMessage() {
    const userMsg: Message = {
      role: 'user',
      content: textInput.value
    }

    conversations.addMessage(params.chatId!, userMsg)
    conversations.getResponse(params.chatId!)
    textInput.clearInput()
  }

  async function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key == 'Enter') {
      if (e.shiftKey) {
        e.preventDefault()
      } else {
        await getMessage()
      }
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-5 py-4 flex grow-0 border-b-amber-100 border-b  justify-between items-center">
        <div className="flex flex-col items-start">
          <h2>
            {currentChat.title || 'New Conversation'}
          </h2>
          <div className="text-sm">
            {currentChat.messages.length} messages
          </div>
        </div>

        <div className="flex gap-2 text-sm h-fit ">
          <div className="border p-2 rounded-xl flex ">
            <ReloadOutlined />
          </div>
          <div className="border p-2 rounded-xl flex ">
            <EditFilled />
          </div>
          <div className="border p-2 rounded-xl flex ">
            <SendOutlined />
          </div>
        </div>

      </div>
      <div className="flex flex-col gap-5 grow overflow-auto px-5 pt-5 pb-10" ref={displayArea}>
        {
          currentChat.messages.map((msg, idx) => {
            return (
              <div className={`flex border-2 px-3 py-2 rounded-md max-w-3/4 w-fit [&.user]:self-end ${msg.role}`} key={idx}>
                <div className="whitespace-pre-wrap text-start">
                  {msg.content}
                </div>
              </div>
            )
          })
        }

      </div>
      <div className="px-5 pt-2  pb-5 border-t relative">
        <textarea className="w-full py-2 focus:border-blue-500 pl-2 outline-none pr-[90px] resize-none border rounded-xl"
          value={textInput.value}
          placeholder="Write a message ..."
          onChange={textInput.onChange}
          onKeyUp={handleKeyDown} />
        <button className="absolute right-12 top-6 rounded z-10 text-blue-600 border p-1 text-xl h-fit"
          onClick={getMessage}>
          <div className="flex items-center justify-center">
            <CheckCircleFilled />
          </div>
        </button>
      </div>
    </div>
  )
}

const ChatContent = observer(ChatContentComponent)

function ChatViewer() {
  const params = useParams()
  const idx = conversations.chats.findIndex(chat => chat.chatId == params.chatId)

  if (idx == -1) {
    return (
      <EmptyComp />
    )
  }

  return <ChatContent idx={idx} />
}

export default observer(ChatViewer)
