export const Inicio = ({ aboutContent, children }) => {
  return (
    <div className="contenedorInicio">
      <div className="InicioIzquierda">
        <div className="titulo">
          <h4>Bienvenido al café</h4>
        </div>
        <div className="contenido">
          <p>En Coffee Shop estamos agradecidos con su visita, esperamos poder servirle a gusto</p>
          <span>Buen provecho!</span>
        </div>
        {aboutContent && (
          <div className="aboutContent">
            {aboutContent}
          </div>
        )}
      </div>
      <div className="InicioDerecha">
        {children}
      </div>

    </div>)
}