import { useState, useEffect } from "react"

const UsuariosNuevo = ({ setMensaje }) => {
    const [usuario, setUsuario] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [id, setId] = useState() //id producto nuevo
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [group_name, setGroup_name] = useState('')

    const [actualizar, setActualizar] = useState(false) //Actualizar estado para limpiar formulario

    //usuarios[]
    useEffect(() => {
        try {
            fetch('http://localhost:8000/users', {
                method: 'GET' /* or POST/PUT/PATCH/DELETE */,
                headers: {
                    Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setUsuarios(data);
                });
        } catch (error) {
            console.error('Error:', error);
        }
    }, []);

    //usuarios[actualizar]
    useEffect(() => {
        try {
            fetch('http://localhost:8000/users', {
                method: 'GET' /* or POST/PUT/PATCH/DELETE */,
                headers: {
                    Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setUsuarios(data);
                });
        } catch (error) {
            console.error('Error:', error);
        }
    }, [actualizar]);


    // Actualizar id para usuario Nuevo.
    useEffect(() => { obtenerIdMasAlto(); }, [usuarios]);

    //obtener id para usuario nuevo
    const obtenerIdMasAlto = () => {
        const idMasAlto = usuarios.reduce((maxId, usuario) => {
            return usuario.id > maxId ? usuario.id : maxId;
        }, 0);
        setId(idMasAlto + 1);
    };


    //Nuevo usuario POST
    const onNuevoUsuario = (e) => {
        e.preventDefault()
        const last_login = null;
        const is_superuser = null;
        const is_staff = true;
        const is_active = true;
        const date = new Date();
        const date_joined = date.toISOString();
        const group_name = "recepcionista"
        try {
            fetch('http://localhost:8000/users/', {
                method: 'POST',
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
                    password,

                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setUsuario(data)
                    setMensaje("Usuario Nuevo Registrado")
                    setActualizar(!actualizar)
                }
                )
        } catch (e) { console.log("error onNuevoUsuario:", e) }
    }


    return (
        <div className="contenedorForm">
          <div className="titulo">
            <h3>Nuevo Usuario</h3>
          </div>
          <form onSubmit={onNuevoUsuario}>
            <p>Cargar datos del nuevo Usuario</p>
            <input
              aria-label="UserName"
              placeholder="Nick de Usuario"
              id="username"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              aria-label="Nombre"
              placeholder="Nombre"
              id="first_name"
              type="text"
              onChange={(e) => {
                setFirst_name(e.target.value);
              }}
            />
            <input
              aria-label="Apellido"
              placeholder="Apellido"
              id="last_name"
              type="text"
              onChange={(e) => {
                setLast_name(e.target.value);
              }}
            />
            <input
              aria-label="email"
              placeholder="E-mail"
              id="email"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              aria-label="password"
              placeholder="Clave de acceso"
              id="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <select
              id="group_name"
              onChange={(e) => {
                setGroup_name(e.target.value);
              }}
            >
              <option value="admin">Admin</option>
              <option value="recepcionista">Recepcionista</option>
              <option value="cocinero">Cocinero</option>
            </select>
            <button type="submit">Registrar</button>
          </form>
        </div>
      );
      
}
export default UsuariosNuevo