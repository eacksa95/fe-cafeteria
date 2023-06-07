import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom'
//estilos
import '../../estilos/home.css'

//componentes
import Navbar from './Navbar'
import { Foo } from './Foo'
import DropdownMenu from './DropdownMenu'
import { ProtectedRoute } from '../ProtectedRoute' //componente para protejer las rutas por usuario y roles

//inicio
import { Inicio } from './Inicio'
import About from '../info/About'
import Contact from '../info/Contact'

//admin
import AdminIndex from '../admin/AdminIndex'
import Perfil from '../admin/Perfil'
import UsuariosNuevo from '../admin/UsuariosNuevo'
import UsuariosModificar from '../admin/UsuariosModificar'

//carrito
import { CarritoIndex } from '../carrito/CarritoIndex'

//pedidos
import PedidosIndex from '../pedidos/PedidosIndex'
import PedidosListos from '../pedidos/PedidosListos'
import PedidosPendientes from '../pedidos/PedidosPendientes'

//productos
import ProductosIndex from '../productos/ProductosIndex'
import ProductosTabla from '../productos/ProductosTabla'
import ProductosNuevo from '../productos/ProductosNuevo'
import ProductosModificar from '../productos/ProductosModificar'
import UsuariosLista from '../admin/UsuariosLista'


const Home = ({ onLogout, userId }) => {
  const [user, setUser] = useState()
  const role = user ? user.group_name : null
  const logoutHandler = () => { onLogout() }

  // datos de usuario
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


  //Mensajes del sistema en pantalla
  const [mensaje, setMensaje] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  //cuando mensaje cambia, mostrar mensaje por 3 segundos
  useEffect(() => {
    if (mensaje) {
      setMostrarMensaje(true);
      setTimeout(() => {
        setMensaje('');
        setMostrarMensaje(false);
      }, 3000);
    }
  }, [mensaje]);

  //contenido para renderizar
  const contenidoProtegidoporRol = role && role === 'recepcionista' ? <CarritoIndex /> : <Inicio />


  return (
    <div className="home-container">
      <BrowserRouter>
        <Navbar onLogout={logoutHandler} />

        <div className='espacio'>
          <div className='contenedorMenu'>
            <DropdownMenu />
          </div>

          <div className='contenedorMensajes'>
            {mostrarMensaje && <span>{mensaje}</span>}
          </div>


        </div>

        <div className='contenedorRutas'>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/about" element={<Inicio><About /> </Inicio>} />
            <Route path="/contact" element={<Inicio><Contact /> </Inicio>} />
            <Route element={<ProtectedRoute isAllowed={!!user} />}>
              <Route path="/pedidosindex" element={<PedidosIndex ><PedidosPendientes setMensaje={setMensaje} /> </PedidosIndex>} />
              <Route path="/pedidoslistos" element={<PedidosIndex><PedidosListos setMensaje={setMensaje} /> </PedidosIndex>} />
              <Route path="/pedidospendientes" element={<PedidosIndex ><PedidosPendientes setMensaje={setMensaje} /> </PedidosIndex>} />

              <Route path="/productosindex" element={<ProductosIndex><ProductosTabla setMensaje={setMensaje} /></ProductosIndex>} />
              <Route path="/productosnuevo" element={<ProductosIndex><ProductosNuevo setMensaje={setMensaje} /></ProductosIndex>} />
              <Route path="/productosmodificar/:id" element={<ProductosIndex><ProductosModificar setMensaje={setMensaje} /></ProductosIndex>} />
            </Route>

            <Route
              path="/carrito"
              element={<ProtectedRoute redirectTo="/" isAllowed={!!user && role.includes("recepcionista")} >
                <CarritoIndex setMensaje={setMensaje} />
              </ProtectedRoute>
              } />

            <Route element={<ProtectedRoute redirectTo="/" isAllowed={!!user && role.includes("recepcionista")} />}>
              <Route path="/admin" element={<AdminIndex><Perfil userId={userId} /></AdminIndex>} />
              <Route path="/usuarioslista" element={<AdminIndex><UsuariosLista setmensaje={setMensaje} /></AdminIndex>} />
              <Route path="/usuariosnuevo" element={<AdminIndex><UsuariosNuevo setmensaje={setMensaje} /></AdminIndex>} />
              <Route path="/usuariosmodificar/:id" element={<AdminIndex><UsuariosModificar setmensaje={setMensaje} /></AdminIndex>} />


            </Route>
          </Routes>
        </div>


        <div className='contenedorFoo'>
          <Foo />
        </div>

      </BrowserRouter>
    </div>

  )
}

//pagina no encontrada (Route).
export function Notfoundpage() {
  return (
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
