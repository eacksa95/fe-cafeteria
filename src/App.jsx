import { useState, useEffect } from 'react'
import './estilos/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Login from './components/Login'
import Home from './components/Home'
import jwtDecode from 'jwt-decode'

function App() {
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const token = window.localStorage.getItem('accessToken')
    if (token){
      setUserId(jwtDecode(JSON.parse(token)).user_id)
    }
  }, [])

  const onLoginHandler = (userId) => {
    console.log(userId)
    setUserId(userId)
  }

  const onLogoutHandler = () => {
    setUserId(null)
    window.localStorage.removeItem('accessToken')
  }

  return (
    <>
      {userId ? (
        <Home onLogout={onLogoutHandler} userId={userId} />
      ) : (
        <Login onLogin={onLoginHandler} />
      )}

    </>
  )
}




export default App
