import { useState, useEffect } from "react"

const ProductosNuevo = () => {
    const [producto, setProducto] = useState([])
    const [productoId, setProductoId] = useState()
    const [productos, setProductos] = useState([])
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [img, setImg] = useState('')
   
 
	//consultar Pedidos existentes
    useEffect( () => {
        try{
        fetch('http://localhost:8000/productos', {
            method: 'GET' /* or POST/PUT/PATCH/DELETE */,
            headers: {
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                'Content-Type': 'application/json',
                },
            })
            .then((res) => res.json())
            .then((data) => {
            setProductos(data);
            });
        } catch (error) { console.error('Error:', error);
             }
            }, []);

//Extraer id mas alto de la lista de pedidos
const obtenerIdMasAlto = () => {
    const idMasAlto = productos.reduce((maxId, producto) => {
      return producto.id > maxId ? producto.id : maxId;
    }, 0);

    setProductoId(idMasAlto);
  };


    const onNuevoProducto = (e) => {
        e.preventDefault()
        obtenerIdMasAlto()
        const id = productoId
        fetch('http://localhost:8000/productos/', {
          method: 'POST',
          headers:{ Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                    'Content-Type': 'application/json' },
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
          })
      }

    return(
        <div className="contenedorForm">
            <div className="titulo">
                <h3>Nuevo Producto</h3>
            </div>
            <form onSubmit={onNuevoProducto}>
                <p>Cargar datos de nuevo producto</p>
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
                    aria-label="Cantidad"
                    placeholder="Cantidad"
                    id="cantidad"
                    type="number"
                    onChange={(e) => {
                    setCantidad(e.target.value)
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
                <button type="submit">Nuevo</button>
            </form>
        </div>
    )
}
export default ProductosNuevo