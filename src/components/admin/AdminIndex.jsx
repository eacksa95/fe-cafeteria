//componentes
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminIndex = ({children}) => {
  return(
        <div className="Index">
            <div className="titulo">
                <h3>Admin:</h3>

                <div className="nav">
                    <span>
                    <Link to="/admin" className='indexLink'>Mi Perfil</Link> -
                    <Link to="/usuarioslista" className='indexLink'> Lista de Usuarios</Link> - 
                    <Link to="/usuariosnuevo/" className='indexLink'> Nuevo Usuario</Link>
                    </span>
                </div>
            </div>
            <div className="contenido">
                {children}
            </div>
        </div>
        )
}
export default AdminIndex