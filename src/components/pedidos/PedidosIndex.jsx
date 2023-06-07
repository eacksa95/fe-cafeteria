import { Link } from "react-router-dom"

//estilos
import '../../estilos/Pedidos.css'

//pedidos



const PedidosIndex = ({ children }) => {

    return (
        <div className="Index">
            <div className="titulo">
                <h3>Pedidos:</h3>

                <div className="nav">
                    <span>
                        <Link to="/pedidoslistos" className='indexLink'>Listos</Link> -
                        <Link to="/pedidospendientes" className='indexLink'> Pendientes</Link>
                    </span>
                </div>
            </div>

            <div className="contenido">
                {children}
            </div>
        </div>
    )
}

export default PedidosIndex