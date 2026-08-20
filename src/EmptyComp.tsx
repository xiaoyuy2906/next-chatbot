import { Button, Empty } from 'antd'
import { conversations } from './store'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'


const EmptyComp: React.FC = () => {
  const navigate = useNavigate()
  const createNewChat = useCallback(() => {
    const { modelName, chatId } = conversations.createNewChat()
    navigate(`/models/${modelName}/chats/${chatId}`)
  }, [])


  return (
    <div className="flex flex-col justify-center h-full grow">
      <Empty
        description={false}>
        <Button type="primary" onClick={createNewChat}>Create New Chat Now</Button>
      </Empty>
    </div>
  )
}


export default EmptyComp