import Table from 'react-bootstrap/Table';

//iconos FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react'

const PedidosPendientes = ({
                             setMensaje
                            }) => {
    const [pedidos, setPedidos] = useState([])
    const [actualizar, setActualizar] = useState(false)

    //lista de pedidos
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
    //actualizar lista de pedidos
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
  }, [actualizar])
  

    const procesarPedido = (pedido) => {
      //preparando los nombres de variables para el body del request
      const id = pedido.id
      const cliente = pedido.cliente
      const mesa = pedido.mesa
      const lista_productos = pedido.lista_productos
      const monto = pedido.monto
      const estado = true
      // Ejemplo de solicitud POST utilizando fetch:
      try{
      fetch(`http://localhost:8000/pedidos/${pedido.id}/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id,
          cliente,
          mesa,
          lista_productos,
          monto,
          estado }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Pedido procesado:', data);
          setMensaje("Pedido Listo para servir")
          setActualizar(!actualizar)
        })} catch(error) {
          // Manejo de errores en caso de que la solicitud falle
          console.error('Error al procesar el pedido:', error);
        };
    };


    //Eliminar pedido
    const deletePedido = (pedido) => {
      try{
        fetch(`http://localhost:8000/pedidos/${pedido.id}/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
            
          }
                 //delete no requiere body
        })
          .then(() => {
            console.log('Pedido eliminado:');
            setMensaje("Pedido Cancelado")
            setActualizar(!actualizar)
                //pregunta: porque al actualizar el estado actualizar
                //el componente no vuelve a renderizar la lista en la tabla?
          })} catch(error) {
            // Manejo de errores en caso de que la solicitud falle
            console.error('Error al eliminar el pedido:', error);
          };
    }








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
              <th>Listo</th>
              <th>Cancelar</th>
            </tr>
          </thead>
          <tbody>
                { pedidos.map( (pedido) => {
                  if (pedido.estado === false){ 
                    return(        
                    <tr  key={pedido.id}>
                        <td>{pedido.id}</td>
                        <td>{pedido.cliente}</td>
                        <td>{pedido.mesa}</td>
                        <td> Productos</td>
                        <td>{pedido.monto}</td>
                        <td>
                        <button className='botonProcesar' onClick={() => {procesarPedido(pedido)}}>
                        <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                        </button>
                        </td>
                        <td>
                        <button className='botonEliminar' onClick={() => {deletePedido(pedido)}}>
                        <FontAwesomeIcon icon={faTrash} />
                        </button>
                        </td>
                      </tr>)} return null;
                   })}
          </tbody>
        </Table>
      </div>
    )
    
}




export default PedidosPendientes


