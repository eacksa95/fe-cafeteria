import {Link} from 'react-router-dom'
import '../estilos/App.css'

 const Navbar = () => {
    
    return(
      <nav className='navbarcoffee'>
      <ul>
        <li>
          <Link to="/" className='navbarcoffee-link'>Inicio</Link>
        </li>
        <hr />
        <li>
          <Link to="/pedidoslistos" className='navbarcoffee-link'>Pedidos Listos</Link>
        </li>
        <hr />
        <li>
          <Link to="/productos" className='navbarcoffee-link'>Productos</Link>
        </li>
        <hr />
        <li>
          <Link to="/analytics" className='navbarcoffee-link'>Analytics</Link>
        </li>
        <hr />
        <li>
          <Link to="/admin" className='navbarcoffee-link'>Admin</Link>
        </li>
      </ul>
    </nav>
        )
        
  }

  export default Navbar