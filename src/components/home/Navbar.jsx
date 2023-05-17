import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'



const Navbar = ({onLogout}) => {
   
    return(
      <nav className='navbarcoffee'>
      <h4>Coffe Shop</h4>
      <ul>
        <li>
          <Link to="/" className='navbarcoffee-link'>Inicio</Link>
        </li>
        <hr />
        <li>
          <Link to="/pedidoslistos" className='navbarcoffee-link'>Pedidos</Link>
        </li>
        <hr />
        <li>
          <Link to="/productos" className='navbarcoffee-link'>Productos</Link>
        </li>
        <hr />
        <li>
          <Link to="/carrito" className='navbarcoffee-link'>Carrito</Link>
        </li>
      </ul>
      <button onClick={() => {onLogout()}}>Logout</button>

    </nav>
        )
        
  }

  export default Navbar