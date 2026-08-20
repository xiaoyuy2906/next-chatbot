import React, { lazy } from "react"
import { createHashRouter } from "react-router"
import Dashboard from "./Dashboard"

const Settings = lazy(() => import("./Settings.tsx"))
const EmptyComp = lazy(() => import("./EmptyComp.tsx"))



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
