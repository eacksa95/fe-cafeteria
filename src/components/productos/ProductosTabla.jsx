import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

//iconos FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';

const ProductosTabla = ({setMensaje}) => {
    const [actualizar, setActualizar] = useState(false)
    const [productos, setProductos] = useState([])
    const navigate = useNavigate();


    //productos[]
    useEffect(() => {
      try{
        fetch('http://localhost:8000/productos/', {
            method: 'GET' /* or POST/PUT/PATCH/DELETE */,
            headers: {
                      Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                      'Content-Type': 'application/json',
                     },
               })
                .then((res) => res.json())
                .then((data) => {
                                 setProductos(data) }
              )} catch(e) {console.log("error GET Productos:", e)}
    }, [actualizar])

    const onModificarProducto = (producto) => {
      navigate(`/productosmodificar/${producto.id}`);
    }

//Eliminar Producto
//Nuevo Producto POST
const onDeleteProducto = (producto) => {
  try{
  fetch(`http://localhost:8000/productos/${producto.id}/`, {
    method: 'DELETE',
    headers:{ Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`
            },
  })
    .then(() => {
                  setMensaje("Producto Eliminado")
                  setActualizar(!actualizar)
                 }
    )}catch(e){ console.log("error onNuevoPedido:", e)}      }





    return (
      <div className='contenedorTabla'>
            <div className='titulo'>
              <h4>Lista de Productos</h4>
            </div>

        <Table striped bordered hover className='Tabla'>
         <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
                { productos.map( (producto) => {
                    return(        
                    <tr  key={producto.id}>
                        <td>{producto.id}</td>
                        <td>{producto.nombre}</td>
                        <td>{producto.precio}</td>
                        <td>
                        <button className='botonProcesar' onClick={() => {onModificarProducto(producto)}}>
                        <FontAwesomeIcon icon={faPaintBrush} />
                        </button>
                        </td>
                        <td>
                        <button className='botonEliminar' onClick={() => {onDeleteProducto(producto)}}>
                        <FontAwesomeIcon icon={faTrash} />
                        </button>
                        </td>
                      </tr>)
                   })}
          </tbody>
        </Table>
      </div>
    )
}

export default ProductosTabla