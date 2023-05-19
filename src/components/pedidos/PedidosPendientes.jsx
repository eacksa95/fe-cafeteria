import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react'

const PedidosPendientes = () => {
    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/pedidos/', {
            method: 'GET' /* or POST/PUT/PATCH/DELETE */,
            headers: {
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setPedidos(data)
            })
    }, [])


    return (
      <div className='contenedorTabla'>
            <div className='titulo'>
              <h4>Pedidos Pendientes</h4>
            </div>

        <Table striped bordered hover className='Tabla'>
         <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Mesa</th>
              <th>Productos</th>
              <th>Monto</th>
              <th>Listo!</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
                { pedidos.map( (pedido) => {
                    return(        
                    <tr  key={pedido.id}>
                        <td>{pedido.id}</td>
                        <td>{pedido.cliente}</td>
                        <td>{pedido.mesa}</td>
                        <td> Productos</td>
                        <td>{pedido.monto}</td>
                        <td>
                        <button className='botonProcesar'>
                            v
                        </button>
                        </td>
                        <td>
                        <button className='botonEliminar'>
                            x
                        </button>
                        </td>
                      </tr>)
                   })}
          </tbody>
        </Table>
      </div>
    )
}

export default PedidosPendientes