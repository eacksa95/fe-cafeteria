import { useState, useEffect } from "react"

const ProductosModificar = ({ setMensaje }) => {
    const [producto, setProducto] = useState([])
    const [productos, setProductos] = useState([])
    const [id, setId] = useState() //id producto nuevo
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [cantidad, setCantidad] = useState(1)
    const [img, setImg] = useState('https://png.pngtree.com/template/20190323/ourmid/pngtree-coffee-logo-design-image_82183.jpg')
    const [actualizar, setActualizar] = useState(false) //Actualizar estado para limpiar formulario


    //Modificar Producto PUT
    const onModificarProducto = (e) => {
        e.preventDefault()
        try {
            fetch('http://localhost:8000/productos/', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    nombre,
                    precio,
                    cantidad,
                    img
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setProducto(data)
                    setMensaje("Guardando Cambios")
                    setActualizar(!actualizar)
                }
                )
        } catch (e) { console.log("error onNuevoPedido:", e) }
    }


    return (
        <div className="contenedorForm">
            <div className="titulo">
                <h3>Modificar Producto</h3>
            </div>
            <form onSubmit={onModificarProducto}>
                <p>Id del producto a modificar</p>
                <input
                    aria-label="Id"
                    placeholder="Id del Producto"
                    id="id"
                    type="text"
                    onChange={(e) => {
                        setId(e.target.value)
                    }}
                />
                <input
                    aria-label="ProductName"
                    placeholder="Nombre del Producto"
                    id="name"
                    type="text"
                    onChange={(e) => {
                        setNombre(e.target.value)
                    }}
                />
                <input
                    aria-label="Precio"
                    placeholder="Precio"
                    id="precio"
                    type="number"
                    onChange={(e) => {
                        setPrecio(e.target.value)
                    }}
                />
                <input
                    aria-label="Imgen"
                    placeholder="URI - Imagen del producto"
                    id="img"
                    type="text"
                    onChange={(e) => {
                        setImg(e.target.value)
                    }}
                />
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}
export default ProductosModificar