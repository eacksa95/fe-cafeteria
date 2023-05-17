//componentes
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";


export const Admin = () => {
  return(
  <div className="contenedor-admin">
      <div className="titulo">
        <h4>Pagina de administración de usuarios</h4>
      </div>
      <div>
        <span>lista de usuarios</span>
      </div>
      <div>
          <span>crear componentes necesarios para gestionar usuarios</span>
      </div>
      <div>
          <span>el acceso a esta sección del sistema será controlada mediantes
            el route que está en el home verificando el tipo de rol que posée
            el usuario, user.group_name
          </span>
      </div>
  </div>)
}
