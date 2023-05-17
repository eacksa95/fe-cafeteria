import { useState, useEffect } from 'react'

//components/pedido
import PedidosTabla from './PedidosTabla'

const PedidosPendientes = () => {
    return (
        <div className='contenedor'>
            <div className='titulo'>
                <h4>Pedidos Pendientes</h4>
            </div>
            
            <div className='tabla'>
                <PedidosTabla/>
            </div>

        </div>
    )
}

export default PedidosPendientes