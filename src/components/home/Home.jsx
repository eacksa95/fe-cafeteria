import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, Outlet, Link} from 'react-router-dom'
//estilos
import '../../estilos/home.css'

//componentes
import Navbar from './Navbar'
import { Foo } from './Foo'
import DropdownMenu from './DropdownMenu'
import { ProtectedRoute } from '../ProtectedRoute' //componente para protejer las rutas por usuario y roles

//inicio
import { Inicio } from './Inicio'

//admin
import { Admin } from '../admin/Admin'

//carrito
import { CarritoVista } from '../carrito/CarritoVista'

//pedidos
import PedidosListos from '../pedidos/PedidosListos'
import PedidosPendientes from '../pedidos/PedidosPendientes'

//productos
import ProductosLista from '../productos/ProductosLista'


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
  const contenidoProtegidoporRol = role && role === 'recepcionista' ? <CarritoVista /> : <Inicio />

  

  return (
    <div className="home-container">
      <BrowserRouter>
      <Navbar onLogout={logoutHandler}/>
      
      <div className='espacio'>
            <div className='contenedorMenu'>
            <DropdownMenu/>
            </div>
            
            <div className='contenedorMensajes'>
                <span>lugar reservado para mensajes del sistema</span>
            </div>
      </div>
      
      <div className='contenedorRutas'>
            <Routes>
              <Route path="/" element={<Inicio />} />
              
              <Route element={<ProtectedRoute isAllowed={!!user} />}>
                <Route path="/pedidoslistos" element={<PedidosListos />} />
                <Route path="/pedidospendientes" element={<PedidosPendientes/>} />
                <Route path="/productoslista" element={<ProductosLista />} />
              </Route>

              <Route 
                path="/carritodecompra" 
                element={ <ProtectedRoute redirectTo="/" isAllowed={!!user && role.includes("recepcionista")} >
                                        <CarritoVista />
                          </ProtectedRoute>
                       }  />
              
              <Route
                path="/admin"
                element={ <ProtectedRoute redirectTo="/home" isAllowed={!!user && role.includes("admin")} >
                                        <Admin />
                          </ProtectedRoute>
                        } />
             </Routes>
      </div>


      <div className='contenedorFoo'>
          <Foo/>
      </div>

    </BrowserRouter>
    </div>

  )
}


export function Notfoundpage() {
  return(
    <div className='paginanoencontrada'>
          <div className='titulo'>
              <h4> pagina no encontrada</h4>
          </div>
      
          <div className='contenido'>
              <span>No se ha encontrado la pagina</span>
          </div>
    </div>
  )
}


export default Home