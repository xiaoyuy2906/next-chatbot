import React, { lazy } from "react"
import { createHashRouter } from "react-router"
import Dashboard from "./Dashboard"
import { Button, Empty } from 'antd'

const Settings = lazy(() => import("./Settings.tsx"))

const EmptyComp: React.FC = () => (
  <div className="flex flex-col justify-center h-full grow">
    <Empty
      description={false}>
      <Button type="primary">Create New Chat Now</Button>
    </Empty>
  </div>
)


const ChatViewer = React.lazy(() => import("./ChatViewer.tsx"))

const router = createHashRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: '',
        element: <EmptyComp />
      },
      {
        path: "models/:modelName/chats/:chatId",
        element: <ChatViewer />,
      },
      {
        path: 'settings',
        element: <Settings />
      }
    ]
  },
])

export default router
