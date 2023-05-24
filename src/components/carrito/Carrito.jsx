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
		//onEnviarPedido response
		const [pedido, setPedido] = useState([])	
		//pedidoId ++
		const [pedidos, setPedidos] = useState([]);
		const [pedidoId, setPedidoId] = useState();


	//consultar Pedidos existentes
		useEffect( () => {
			try{
			fetch('http://localhost:8000/pedidos/', {
				method: 'GET' /* or POST/PUT/PATCH/DELETE */,
				headers: {
					Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
					'Content-Type': 'application/json',
					},
				})
				.then((res) => res.json())
				.then((data) => setPedidos(data))

			} catch (error) { console.error('Error:', error);
				 }
				}, [])

// extraer MaxId de la lista de pedidos:  id = maxid + 1
		useEffect(() => { obtenerIdMasAlto(); }, [pedidos]);			


// extraer id de productos de allproducts
		useEffect(() => {
					const productIds = allProducts.map((producto) => producto.id);
					setProductosIds(productIds)
				}
				 , [allProducts])

const prueba = () => {console.log(productosIds)}


//Extraer id mas alto de la lista de pedidos
		const obtenerIdMasAlto = () => {
			const idMasAlto = pedidos.reduce((maxId, pedido) => {
				return pedido.id > maxId ? pedido.id : maxId;
			}, 0);	
			setPedidoId(idMasAlto);
		};


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
		//preparando variables para el body del request
			const lista_productos = productosIds
			const id = pedidoId + 1
			const monto = total
			const estado = false
			try{	
			fetch('http://localhost:8000/pedidos/', {
					method: 'POST' /* or POST/PUT/PATCH/DELETE */,
					headers: {
						Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
						'Content-Type': 'application/json',
					}, body: JSON.stringify({
						id,
						mesa,
						lista_productos,
						cliente,
						monto,
						estado
					}),
				}) 
					.then((res) => res.json())
					.then((data) => {
					setPedido(data);
					setActive(false);
					pedidoNuevo()
					});
				} catch (error) { console.error('Error:onEnviarPedido', error);}			
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
					className={`container-cart-products ${
						active ? '' : 'hidden-cart'
					}`}
				>
					{allProducts.length ? (
						<>
							<div className='row-product'>
								{allProducts.map(producto => {return(
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
									</div>)}
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