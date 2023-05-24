import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react'

//iconos FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';

const ProductosTabla = ({setMensaje}) => {

    const [productos, setProductos] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/productos/', {
            method: 'GET' /* or POST/PUT/PATCH/DELETE */,
            headers: {
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setProductos(data)
            })
    }, [])


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
                        <button className='botonProcesar'>
                        <FontAwesomeIcon icon={faPaintBrush} />
                        </button>
                        </td>
                        <td>
                        <button className='botonEliminar'>
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