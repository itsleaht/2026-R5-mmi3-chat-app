import { useEffect } from 'react'
import './App.css'
import { useSocket } from './contexts/SocketContext'
import { useUserStore } from './store/userStore'
import { UserList } from './components/UserList'
import { UserJoin } from './components/UserJoin'
import { TypeMessage } from './components/TypeMessage'

function App() {
  const socket = useSocket()
  const setUsers = useUserStore((state) => state.setUsers)
  const users = useUserStore((state) => state.users)

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

  return (
    <>
      <UserJoin />
      <UserList userList={users} />
      <TypeMessage />
    </>
  )
}

export default App