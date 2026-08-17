import viteLogo from "./assets/sp500.jpeg"
import { Outlet, useNavigate } from "react-router"
import { PlusCircleFilled, SettingFilled, DownloadOutlined } from '@ant-design/icons'
import ChatTab from "./ChatTab"
import { conversations } from "./store.tsx"
import type { Chat } from "./types.ts"
import { Suspense, useCallback } from "react"
import { observer } from "mobx-react"


function Dashboard() {

  const navigate = useNavigate()
  const createNewChat = useCallback(() => {
    const { modelName, chatId } = conversations.createNewChat()
    navigate(`/models/${modelName}/chats/${chatId}`)
  }, [])



  return (
    <div className="flex h-full">
      <div className="flex flex-col basis-1/3 p-5 bg-slate-700 gap-4">
        <div className="flex  py-5 gap-4 items-center">
          <div className="shrink-0">
            <img src={viteLogo} className="w-8 h-8" alt="Vite logo" />
          </div>
          <div className="flex flex-col text-start grow">
            <h2>NextChatBot</h2>
            <span>Tiny & fast AI Assistant.</span>
          </div>
        </div>
        <div className="flex flex-col  space-y-2 h-full overflow-auto">
          {
            conversations.chats.slice().sort((a: Chat, b: Chat) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()).map((chat: Chat) => {
              return (
                <div key={chat.chatId}>
                  <ChatTab chatId={chat.chatId} />
                </div>
              )
            })
          }

        </div>

        <div className="flex  justify-between text-xs">
          <div className="bg-zinc-800 p-2 rounded-xl">
            <SettingFilled />
          </div>
          <div className="bg-zinc-800 p-2 rounded-xl">
            <DownloadOutlined />
          </div>
          <div className="bg-zinc-800 p-2 rounded-xl hover:cursor-pointer" onClick={createNewChat}>
            <PlusCircleFilled /> new chat
          </div>
        </div>
      </div>

      <div className="basis-2/3">
        <Suspense fallback={'...loading'}>
          <Outlet />
        </Suspense>

      </div>
    </div>
  )
}

export default observer(Dashboard)
