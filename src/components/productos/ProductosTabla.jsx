import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react'

const ProductosTabla = () => {

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

export default ProductosTabla