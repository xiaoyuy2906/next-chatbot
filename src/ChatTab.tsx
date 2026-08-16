import { NavLink } from "react-router"
import { conversations } from "./store.tsx"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { observer } from "mobx-react"



function ChatTab({ chatId }: { chatId: string }) {
  const idx = conversations.chats.findIndex(chat => chat.chatId == chatId)
  const currentChat = conversations.chats[idx]
  dayjs.extend(relativeTime)



  return (
    <div>
      <NavLink to={`/models/${currentChat.model}/chats/${chatId}`}>
        <div className="bg-zinc-800 hover:bg-zinc-700 border-2 border-zinc-800  hover:border-blue-600 hover:border-2 rounded-xl flex-col px-4 py-3">
          <div className="flex">
            {currentChat.title}
          </div>
          <div className="text-xs flex justify-between mt-2">
            <span>{currentChat.model}</span>
            <span>
              {
                dayjs(currentChat.lastModified).fromNow(true)
              }
            </span>
          </div>
        </div>
      </NavLink >
    </div >
  )
}

export default observer(ChatTab)