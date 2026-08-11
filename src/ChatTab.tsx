import { NavLink } from "react-router"

function ChatTab() {
  return (
    <div>
      <NavLink to="">
        <div className="bg-zinc-800 hover:bg-zinc-700 border-2 border-zinc-800  hover:border-blue-600 hover:border-2 rounded-xl flex-col px-4 py-3">
          <div className="flex">
            机器学习
          </div>
          <div className="text-xs flex justify-between mt-2">
            <span>gpt-5-min</span>
            <span>10 minutes ago </span>
          </div>
        </div>
      </NavLink >
    </div>
  )
}

export default ChatTab