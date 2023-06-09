import { useState, useEffect } from 'react'
import coffeeIcon from '../../assets/coffee.svg'
import jwtDecode from 'jwt-decode'

//estilos
import '../../estilos/Login.css'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  //Mensajes del sistema en pantalla
  const [mensaje, setMensaje] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  //cuando mensaje cambia, mostrar mensaje por 3 segundos
  useEffect(() => {
    if (mensaje) {
      setMostrarMensaje(true);
      setTimeout(() => {
        setMensaje('');
        setMostrarMensaje(false);
      }, 3000);
    }
  }, [mensaje]);



  const loginHandle = (e) => {
    e.preventDefault();
    if (!username) {
      setMensaje("Debe proporcionar usuario");
      return;
    }
    if (!password) {
      setMensaje("Debe proporcionar Contraseña");
      return;
    }
  
    // login and get a user with JWT token
    try {
      fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((res) => {
          if (res.ok) {
            // Login exitoso
            return res.json();
          } else {
            throw new Error("Error en el login.");
          }
        })
        .then((tokenData) => {
          if (tokenData.error) {
            setMensaje("Error iniciando sesión"); // Actualizar el mensaje de error si está presente en la respuesta
            return;
          }
          window.localStorage.setItem("accessToken", JSON.stringify(tokenData.access) );
          console.log(tokenData);
          console.log(jwtDecode(tokenData.access).user_id);
          onLogin(jwtDecode(tokenData.access).user_id);
        })
        .catch((error) => {
          setMensaje("Error en el login"); // Manejar el error de autenticación aquí
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };





  return (
    <>

      <div className='contenedorMensajes'>
        {mostrarMensaje && <span>{mensaje}</span>}
      </div>

      <form onSubmit={loginHandle}>
        <img src={coffeeIcon} alt="Coffee Icon" width={100} />
        <h2>Coffee Time</h2>
        <p>Please login to your account</p>
        <input
          aria-label="Username"
          placeholder="Username"
          id="username"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
        <input
          aria-label="Password"
          placeholder="Password"
          id="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <button type="submit">Login</button>
      </form>
    </>

  )
}

export default Login
