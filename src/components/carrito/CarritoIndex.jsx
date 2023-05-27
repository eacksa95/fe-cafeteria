import { useState } from "react";
import { Carrito } from "./Carrito"
import { ListaProductos } from "./ListaProductos"
export const CarritoIndex = ({setMensaje}) => {
	const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);

	function pedidoNuevo(){setMensaje("Pedido enviado a la cocina")}

	return (
		
		<>
			<Carrito
				pedidoNuevo={pedidoNuevo}
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
			/>
            <ListaProductos
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
            />                
		</>
	);
}
