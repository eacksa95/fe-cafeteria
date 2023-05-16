import { useState, useEffect } from 'react'
import '../estilos/App.css'
import {BrowserRouter, Routes, Route, Outlet, Link} from 'react-router-dom'

//componentes
import Navbar from './Navbar'
import DropdownMenu from './DropdownMenu'
import { ProtectedRoute } from './ProtectedRoute' //componente para protejer las rutas por usuario y roles
import Productos from './Productos'
import PedidosListos from './PedidosListos'
import NuevoPedido from './Nuevopedido'
import { Inicio } from './Inicio'

//paginas
import { Admin, Analytics, Dashboard }from '../pages'


const Home = ({ onLogout, userId }) => {
  const [user, setUser] = useState()
  const role = user ? user.group_name : null
  const logoutHandler = () => { onLogout() }

  // user data
  useEffect(() => {
    fetch('http://localhost:8000/users/' + userId, {
      method: 'GET' /* or POST/PUT/PATCH/DELETE */,
      headers: {
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((userData) => {
        setUser(userData)
      })
  }, [])



  //contenido para renderizar
  const content = role && role === 'recepcionista' ? <Productos /> : <p>Home Page</p>

  
  //<button onClick={logoutHandler}>Logout</button>
  return (
    <div className="home">
      <BrowserRouter>
      <Navbar />
      
      <div className='contenedorMenu'>
      <DropdownMenu/>
      </div>
      
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
        <Route path="/pedidoslistos" element={<PedidosListos />} />
          <Route path="/nuevopedido" element={<NuevoPedido/>} />
          <Route path="/productos" element={<Productos />} />
        </Route>
        <Route
          path="/analytics"
          element={
            <ProtectedRoute
              redirectTo="/home"
              isAllowed={!!user && role.includes("recepcionista")}
            >
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              redirectTo="/home"
              isAllowed={!!user && role.includes("admin")}
            >
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
        
          {/* {user &&
          <>
            <h4>Bienvenido {user.group_name} {user.username}!</h4>
            {content}
          </>} */}


    </div>

  )
}


function Notfoundpage() {
  return(
    <main>
      <h2>No se ha encontrado la pagina</h2>
    </main>
  )
}


export default Home
