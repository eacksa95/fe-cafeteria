import '../../estilos/Productos.css'
import { Link } from 'react-router-dom'

const ProductosIndex = ({children}) => {
    return(
        <div className="Index">
           
            <div className="titulo">
                <h4>Productos:</h4>
                
                <div className="nav">
                     <span>
                     <Link to="/productosnuevo" className='indexLink'>Nuevo</Link> -
                     <Link to="/productosindex" className='indexLink'> Listado</Link>
                    </span>
                </div>
            </div>


            <div className="contenido">
                {children}
            </div>
        </div>
    )

}
export default ProductosIndex