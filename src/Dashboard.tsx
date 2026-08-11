import viteLogo from "./assets/vite.svg"

function Dashboard() {
  return (
    <div className="flex ">
      <div className="flex basis-1/3 p-5 bg-slate-700">
        <div className="flex py-5 gap-4 items-center grow">
          <div className="shrink-0">
            <img src={viteLogo} className="w-10 h-10" alt="Vite logo" />
          </div>
          <div className="flex-col text-start grow">
            <h2>NextChatBot</h2>
            <span>Tiny & fast AI Assistant.</span>
          </div>
        </div>
      </div>

      <div className="basis-2/3">New Conversation</div>
    </div>
  )
}

export default Dashboard
