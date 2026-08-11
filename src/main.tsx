import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router/dom"
import router from "./router.tsx"
import "./index.css"

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

const root = document.getElementById("root") as HTMLElement

ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
