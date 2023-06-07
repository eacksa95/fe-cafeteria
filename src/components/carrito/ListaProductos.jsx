import { useState, useEffect } from "react";


export const ListaProductos = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {

	const [productos, setProductos] = useState([])

	useEffect(() => {
		try {
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
		} catch (e) { console.log("error listaProductos: ", e) }
	}, [])



	//Agregar producto al carrito: allProducts[]
	const onAddProduct = producto => {
		if (allProducts.find(item => item.id === producto.id)) {
			const products = allProducts.map(item =>
				item.id === producto.id
					? { ...item, cantidad: item.cantidad + 1 }
					: item
			);
			setTotal(total + producto.precio * producto.cantidad);
			setCountProducts(countProducts + producto.cantidad);
			return setAllProducts([...products]);
		}
		setTotal(total + producto.precio * producto.cantidad);
		setCountProducts(countProducts + producto.cantidad);
		setAllProducts([...allProducts, producto]);
	};

	return (
		<div className='container-items'>
			{productos.map((producto) => {
				return (
					<div className='item' key={producto.id}>
						<figure>
							<img src={producto.img} alt={producto.nombre} />
						</figure>
						<div className='info-product'>
							<h4>{producto.nombre}</h4>
							<p className='price'>${producto.precio}</p>
							<button onClick={() => onAddProduct(producto)}>
								<h4>pedir</h4>
							</button>
						</div>
					</div>
				)

			})}
		</div>
	);
};