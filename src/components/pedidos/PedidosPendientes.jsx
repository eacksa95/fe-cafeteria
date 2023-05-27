import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
//iconos FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';




//--------------------------------------------------------------//

const PedidosPendientes = ({
                             setMensaje
                            }) => {
    const [pedidos, setPedidos] = useState([])
    const [actualizar, setActualizar] = useState(false)

//lista de pedidos inicial
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
  

  const onProcesarPedido = (pedido) => {
      //preparando los nombres de variables para el body del request
      const id = pedido.id
      const cliente = pedido.cliente
      const mesa = pedido.mesa
      const lista_productos = pedido.lista_productos
      const monto = pedido.monto
      const estado = "listo"
      const fecha_recepcion = pedido.fecha_recepcion
      const hora_recepcion = pedido.hora_recepcion
      const currentDate = new Date();
			const hora_listo = currentDate.toLocaleTimeString([], { hour12: false });
      const hora_entregado = pedido.hora_entregado
      // solicitud PUT utilizando fetch: pedido.estado="listo" - setHoraListo
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
                  estado,
                  fecha_recepcion,
                  hora_recepcion,
                  hora_listo,
                  hora_entregado

                 }),
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
                  //Resuelto. faltaba agregar el ,[actualizar] al use efect
        })} catch(error) {
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
              <th>hora Entrada</th>
              <th>Mesa</th>
              <th>Productos</th>
              <th>Listo</th>
              <th>Cancelar</th>
            </tr>
          </thead>
          <tbody>
             {pedidos.map( (pedido) => {
              if (pedido.estado === "pendiente"){ 
                // Obtener el formato válido para la fecha
                const hora_recepcion = pedido.hora_recepcion; // Obtener la hora de recepción en formato de cadena de texto
                const hora_formateada = new Date().toLocaleString('en-US', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                      });
                return(        
                <tr  key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>{hora_formateada}</td>
                    <td>{pedido.mesa}</td>
                    <td>
                        {pedido.lista_productos.map((productoId) => (
                          <li key={productoId}>{productoId}</li>
                        ))}
                    </td>
                    <td>
                    <button className='botonProcesar' onClick={() => {onProcesarPedido(pedido)}}>
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


