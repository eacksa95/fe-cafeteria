import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//iconos FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';


const UsuariosTabla = (setMensaje) => {
    const [usuarios, setUsuarios] = useState([])
    const [usuario, setUsuario] = useState([])
    const [actualizar, setActualizar] = useState([])
    const navigate = useNavigate();


    //usuarios[]
  useEffect(() => {
    try {
      fetch('http://localhost:8000/users/', {
        method: 'GET' /* or POST/PUT/PATCH/DELETE */,
        headers: {
          Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsuarios(data)
        }
        )
    } catch (e) { console.log("error GET Usuarios:", e) }
  }, [actualizar])

  const onModificarUsuario = (usuario) => {
    navigate(`/usuariosmodificar/${usuario.id}`);
  }

 //Eliminar Producto
 const onDeleteUsuario = (usuario) => {
    try {
      fetch(`http://localhost:8000/users/${usuario.id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`
        },
      })
        .then(() => {
          setMensaje("Usuario Eliminado")
          setActualizar(!actualizar)
        }
        )
    } catch (e) { console.log("error onEliminarUsuario:", e) }
  }



    return (
        <div className='contenedorTabla'>
      <div className='titulo'>
        <h4>Lista de Usuarios</h4>
      </div>

      <Table striped bordered hover className='Tabla'>
        <thead>
          <tr>
            <th>#</th>
            <th>user_name</th>
            <th>first_name</th>
            <th>last_name</th>
            <th>email</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => {
            return (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.username}</td>
                <td>{usuario.first_name}</td>
                <td>{usuario.last_name}</td>
                <td>{usuario.email}</td>
                <td>
                  <button className='botonProcesar' onClick={() => { onModificarUsuario(usuario) }}>
                    <FontAwesomeIcon icon={faPaintBrush} />
                  </button>
                </td>
                <td>
                  <button className='botonEliminar' onClick={() => { onDeleteUsuario(usuario) }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>)
          })}
        </tbody>
      </Table>
    </div>
    )
}

export default UsuariosTabla