import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react'

//iconos FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const PedidosListos = ({ setMensaje }) => {
  const [pedidos, setPedidos] = useState([])
  const [actualizar, setActualizar] = useState(false)

  //pedidos[]
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

  //Actualizar lista de pedidos
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

  //Filtrar pedidos por estado === "listo"


  const pedidos_listos = (pedidos) => { pedidos.map() }




  const entregarPedido = (pedido) => {
    //preparando los nombres de variables para el body del request
    const id = pedido.id
    const cliente = pedido.cliente
    const mesa = pedido.mesa
    const lista_productos = pedido.lista_productos
    const monto = pedido.monto
    const estado = "entregado"
    const fecha_recepcion = pedido.fecha_recepcion
    const hora_recepcion = pedido.hora_recepcion
    const hora_listo = pedido.hora_listo
    const currentDate = new Date();
    const hora_entregado = currentDate.toLocaleTimeString([], { hour12: false });
    
    // Ejemplo de solicitud POST utilizando fetch:
    try {
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
          estado,
          fecha_recepcion,
          hora_recepcion,
          hora_listo,
          hora_entregado
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Pedido entregado:', data);
          setMensaje("Pedido Entregado")
          setActualizar(!actualizar)
        })
    } catch (error) {
      // Manejo de errores en caso de que la solicitud falle
      console.error('Error al procesar el pedido:', error);
    };
  };


  //Eliminar pedido

  const deletePedido = (pedido) => {
    try {
      fetch(`http://localhost:8000/pedidos/${pedido.id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,

        }
        //delete no requiere body
      })
        .then(() => {
          setMensaje("Pedido Cancelado.");
          setActualizar(!actualizar);
          //pregunta: porque al actualizar el estado actualizar
          //el componente no vuelve a renderizar la lista en la tabla?
        })
    } catch (error) {
      // Manejo de errores en caso de que la solicitud falle
      console.error('Error al eliminar el pedido:', error);
    };
  }



  return (
    <div className='contenedorTabla'>
      <div className='titulo'>
        <h4>Pedidos Listos</h4>
      </div>

      <Table striped bordered hover className='Tabla'>
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Mesa</th>
            <th>Productos</th>
            <th>Monto</th>
            <th>Entregado</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => {
            if (pedido.estado === "listo") {
              return (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.cliente}</td>
                  <td>{pedido.mesa}</td>
                  <td> Productos</td>
                  <td>{pedido.monto}</td>
                  <td>
                    <button className='botonProcesar' onClick={() => { entregarPedido(pedido) }}>
                      <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                    </button>
                  </td>
                  <td>
                    <button className='botonEliminar' onClick={() => { deletePedido(pedido) }}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>)
            } return null;
          })}

        </tbody>
      </Table>
    </div>
  )
}

export default PedidosListos