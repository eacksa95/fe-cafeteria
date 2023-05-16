import Pedidos from './Pedidos'

const PedidosListos = () => {
    return(
      <div className="pedidoslistos">
          <div className="pedidoslistos-titulo">
          <h2>Pedidos Listos</h2><hr />
          </div>
          <div className="pedidoslistos-pedidos">
              <Pedidos />
          </div>
     
    </div>
    )
  }
  export default PedidosListos