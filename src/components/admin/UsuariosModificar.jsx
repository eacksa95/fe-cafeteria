import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';


const UsuariosModificar = ({ setMensaje }) => {
    const [usuario, setUsuario] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const { id } = useParams(); //path param user.id
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')

    const [actualizar, setActualizar] = useState(false) //Actualizar estado para limpiar formulario





    //Modificar usuario PUT
    const onModificarUsuario = (e) => {
        e.preventDefault()
        const group_name = "recepcionista"
        const password = "asdfasdf"
        try {
            fetch(`http://localhost:8000/users/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    username,
                    email,
                    first_name,
                    last_name,
                    group_name,
                    password
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setUsuario(data)
                    setMensaje("Usuario Actualizado");
                    setActualizar(!actualizar)
                }
                )
        } catch (e) { console.log("error onActualizarUsuario:", e) }
    }


    return (
        <div className="contenedorForm">
            <div className="titulo">
                <h3>Actualizar Usuario</h3>
            </div>
            <form onSubmit={onModificarUsuario}>
                <p>Actualizar datos del Usuario</p>
                <input
                    aria-label="UserName"
                    placeholder="Nick de Usuario"
                    id="username"
                    type="text"
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                />
                <input
                    aria-label="Nombre"
                    placeholder="Nombre"
                    id="first_name"
                    type="text"
                    onChange={(e) => {
                        setFirst_name(e.target.value)
                    }}
                />
                <input
                    aria-label="Apellido"
                    placeholder="Apellido"
                    id="last_name"
                    type="text"
                    onChange={(e) => {
                        setLast_name(e.target.value)
                    }}
                />
                <input
                    aria-label="email"
                    placeholder="E-mail"
                    id="email"
                    type="text"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
    )
}
export default UsuariosModificar