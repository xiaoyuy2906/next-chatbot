import { NavLink, useNavigate } from "react-router"
import { conversations } from "./store.tsx"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { observer } from "mobx-react"
import { CloseCircleFilled } from "@ant-design/icons"
import { useCallback } from "react"



function ChatTab({ chatId }: { chatId: string }) {
  const navigate = useNavigate()
  const idx = conversations.chats.findIndex(chat => chat.chatId == chatId)
  const currentChat = conversations.chats[idx]
  dayjs.extend(relativeTime)


  const deleteChat = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // e.stopPropagation()
    e.preventDefault()
    conversations.deleteChat(chatId)
    navigate('/')
  }, [])



  return (
    <div>
      <NavLink to={`/models/${currentChat.model}/chats/${chatId}`}>
        <div className="bg-zinc-800 relative hover:bg-zinc-700 border-2 border-zinc-800  hover:border-blue-600 hover:border-2 rounded-xl flex-col px-4 py-3 group ">
          <div className="flex">
            {currentChat.title || 'New Conversation'}
          </div>
          <div className="absolute top-2 right-2 hidden group-hover:flex" onClick={deleteChat}>
            <CloseCircleFilled />
          </div>

          <div className="text-xs flex justify-between mt-2">
            <span>{currentChat.model}</span>
            <span>
              {
                dayjs(currentChat.lastModified).fromNow(true) + ' ago'
              }
            </span>
          </div>
        </div>
      </NavLink >
    </div >
  )
}

export default observer(ChatTab)