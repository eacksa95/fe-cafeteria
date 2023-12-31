import { faPersonThroughWindow } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

export const Carrito = ({
	pedidoNuevo,
	allProducts,
	setAllProducts,
	total,
	countProducts,
	setCountProducts,
	setTotal,
}) => {
	const [active, setActive] = useState(false);
	const [cliente, setCliente] = useState('cliente');
	const [mesa, setMesa] = useState();

	//productos Ids de allproducts
	const [productosIds, setProductosIds] = useState([])
	const [productosCantidad, setProductosCantidad] = useState([])
	//onEnviarPedido response
	const [pedido, setPedido] = useState([])
	//pedidoId ++
	const [pedidos, setPedidos] = useState([]);
	const [id, setId] = useState();
	//actualizar
	const [actualizar, setActualizar] = useState(false)

	//consultar Pedidos existentes primera vez
	// useEffect( () => {
	// 	try{
	// 	fetch('http://localhost:8000/pedidos/', {
	// 		method: 'GET' /* or POST/PUT/PATCH/DELETE */,
	// 		headers: {
	// 			Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
	// 			'Content-Type': 'application/json',
	// 			},
	// 		})
	// 		.then((res) => res.json())
	// 		.then((data) => setPedidos(data))

	// 	} catch (error) { console.error('Error:', error);
	// 		 }
	// 		}, [])

	//consultar Pedidos existentes actualizar
	useEffect(() => {
		try {
			fetch('http://localhost:8000/pedidos/', {
				method: 'GET' /* or POST/PUT/PATCH/DELETE */,
				headers: {
					Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
					'Content-Type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((data) => setPedidos(data))

		} catch (error) {
			console.error('Error:', error);
		}
	}, [actualizar])

	// Actualizar id para Pedido nuevo
	useEffect(() => { obtenerIdMasAlto(); }, [pedidos]);

	//Obtener id para nuevo Pedido
	const obtenerIdMasAlto = () => {
		const idMasAlto = pedidos.reduce((maxId, pedido) => {
			return pedido.id > maxId ? pedido.id : maxId;
		}, 0);
		setId(idMasAlto + 1);
	};

	// extraer id de productos de allproducts
	useEffect(() => {
		const productIds = allProducts.map((producto) => producto.id);
		setProductosIds(productIds)
	}, [allProducts])

	// extraer id de productos de allproducts
	useEffect(() => {
		const productosCantidad = allProducts.map((producto) => producto.cantidad);
		setProductosCantidad(productosCantidad)
	}, [allProducts])




	//eliminar articulo de carrito		
	const onDeleteProduct = producto => {
		const results = allProducts.filter(
			item => item.id !== producto.id
		);
		setTotal(total - producto.precio * producto.cantidad);
		setCountProducts(countProducts - producto.cantidad);
		setAllProducts(results);
	};

	//vaciar carrito
	const onCleanCart = () => {
		setAllProducts([]);
		setTotal(0);
		setCountProducts(0);
	};

	//enviar Pedido
	const onEnviarPedido = () => {
		//renombrando campos
		const lista_productos = productosIds
		const lista_cantidad = productosCantidad
		//const lista_productos = JSON.stringify(allProducts); ------no funciona
		const monto = total
		const estado = "pendiente"
		const fecha_recepcion = new Date().toISOString().split('T')[0];
		const hora_recepcion = new Date().toLocaleTimeString([], { hour12: false });
		const hora_listo = null
		const hora_entregado = null
		try {
			fetch('http://localhost:8000/pedidos/', {
				method: 'POST' /* or POST/PUT/PATCH/DELETE */,
				headers: {
					Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id,
					cliente,
					mesa,
					lista_productos,
					lista_cantidad,
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
					setPedido(data);
					setActive(!active);
					pedidoNuevo()
					setActualizar(!actualizar)
				});
		} catch (error) { console.error('Error:onEnviarPedido', error); }
	}



	return (
		<header className='carrito'>

			<div className='carrito-titulo'>
				<h3>Carrito</h3>
				<p>Buen apetito</p>
			</div>

			<div className='contenedorInputs'>
				<div className='Cliente'>
					<input
						aria-label="Cliente"
						placeholder="Cliente"
						id="cliente"
						type="text"
						onChange={(e) => {
							setCliente(e.target.value)
						}}
					/>
				</div>
				<div className='Mesa'>
					<input
						aria-label="Mesa"
						placeholder="Mesa Nº"
						id="Mesa"
						type="text"
						onChange={(e) => {
							setMesa(e.target.value)
						}}
					/>
				</div>
			</div>




			<div className='container-icon'>
				<div
					className='container-cart-icon'
					onClick={() => setActive(!active)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='icon-cart'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
						/>
					</svg>
					<div className='count-products'>
						<span id='contador-productos'>{countProducts}</span>
					</div>
				</div>

				<div
					className={`container-cart-products ${active ? '' : 'hidden-cart'
						}`}
				>
					{allProducts.length ? (
						<>
							<div className='row-product'>
								{allProducts.map(producto => {
									return (
										<div className='cart-product' key={producto.id}>
											<div className='info-cart-product'>
												<span className='cantidad-producto-carrito'>
													{producto.cantidad}
												</span>
												<p className='titulo-producto-carrito'>
													{producto.nombre}
												</p>
												<span className='precio-producto-carrito'>
													${producto.precio}
												</span>
											</div>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='currentColor'
												className='icon-close'
												onClick={() => onDeleteProduct(producto)}
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M6 18L18 6M6 6l12 12'
												/>
											</svg>
										</div>)
								}
								)}
							</div>

							<div className='cart-total'>
								<h3>Total:</h3>
								<span className='total-pagar'>${total}</span>
							</div>

							<button className='btn-clear-all' onClick={onCleanCart}>
								Vaciar Carrito
							</button>
							<button className='btn-enviarpedido' onClick={onEnviarPedido}>
								Enviar Pedido
							</button>
						</>
					) : (
						<p className='cart-empty'>El carrito está vacío</p>
					)}
				</div>
			</div>
		</header>
	);
};


