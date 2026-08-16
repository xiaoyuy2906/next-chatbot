import React from "react"
import { createHashRouter } from "react-router"
import Dashboard from "./Dashboard"

const ChatViewer = React.lazy(() => import("./ChatViewer.tsx"))

const router = createHashRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "models/:modelName/chats/:chatId",
        element: <ChatViewer />,
      },
    ]
  },
])

export default router
