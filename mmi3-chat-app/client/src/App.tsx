import { useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/Button'
import { useSocket } from './contexts/SocketContext'
import { useUserStore } from './store/userStore'

function App() {
  const socket = useSocket()
  const setUsers = useUserStore((state) => state.setUsers)
  const users = useUserStore((state) => state.users)
  const [inputUsernameValue, setInputUsernameValue] = useState("")

  useEffect(() => {
    socket.on('user_list', (payload) => {
      setUsers(payload.list);
    })
    
    return () => {
      socket.off('user_list')
    }
  }, [socket])

  return (
    <>
      <input type="text" placeholder="Nom d'utilisateur" className="input" onChange={(e) => setInputUsernameValue(e.currentTarget.value)} />
      <Button 
        onClickButton={() => {
          socket.emit('user_join', {
            user: {
              username: inputUsernameValue
            }
          })
        }}>bouton</Button>
        {users.map((user) => <div key={user.id}>
          {user.id} - {user.username}
        </div>)}

    </>
  )
}

export default App