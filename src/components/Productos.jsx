import { useState, useEffect } from 'react'

const Productos = () => {
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
        <div className='listaProductos'>
            <ul>
                {productos.map((producto) => {
                    return <li key={producto.id}>{producto.nombre} - {producto.precio}</li>
                })}
            </ul>
        </div>
    )
}

export default Productos
