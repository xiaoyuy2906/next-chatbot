import React from "react"
import ReactDOM from "react-dom/client"
import { createHashRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import Dashboard from "./Dashboard"

const router = createHashRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
])

export default router
