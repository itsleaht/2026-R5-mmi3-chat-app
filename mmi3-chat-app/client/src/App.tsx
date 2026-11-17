import { useEffect } from 'react'
import './App.css'
import { useSocket } from './contexts/SocketContext'
import { useUserStore } from './store/userStore'
import { UserList } from './components/UserList'
import { UserJoin } from './components/UserJoin'
import { TypeMessage } from './components/TypeMessage'
import { useMessageStore } from './store/messageStore'
import { MessageList } from './components/MessageList'

function App() {
  const socket = useSocket()
  const setUsers = useUserStore((state) => state.setUsers)
  const users = useUserStore((state) => state.users)
  const addMessage = useMessageStore((state) => state.addMessage)
  const setMessages = useMessageStore((state) => state.setMessages)
  const messages = useMessageStore((state) => state.messages)

  useEffect(() => {
    socket.on('user_list', (payload) => {
      setUsers(payload.list);
    })
    
    return () => {
      socket.off('user_list')
    }
  }, [socket])

  useEffect(() => {
    socket.emit('query_user_list');
  }, [socket])

  useEffect(() => {
    socket.on('message_list', (payload) => {
      setMessages(payload.list)
    })
  }, [socket])

  useEffect(() => {
    socket.emit('query_message_list');
  }, [socket])

  useEffect(() => {
    socket.on('receive_message', (payload) => {
      addMessage(payload.message)
    })

    return () => {
      socket.off('receive_message')
    }
  }, [socket])

  return (
    <>
      <UserJoin />
      <UserList userList={users} />
      <MessageList messageList={messages} />
      <TypeMessage />
    </>
  )
}

export default App