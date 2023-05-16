import { useState, useEffect } from 'react'

const Pedidos = () => {
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
        <div className='listaPedidos'>
            <ul>
                {pedidos.map((pedido) => {
                    return <li key={pedido.id}>Pedido:{pedido.id} Mesa: {pedido.mesa}</li>
                })}
            </ul>
        </div>
    )
}

export default Pedidos
