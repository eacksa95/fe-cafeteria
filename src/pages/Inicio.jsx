import { useEffect } from "react"

const Inicio = (user) => {
    const [user, setUser] = useState()
    
    useEffect( () => {setUser(user)}, [])
    
    return (  
        <>     
         {user &&        
          <h4>Bienvenido {user.group_name} {user.username}!</h4>
        }
    <h3>hola</h3>
    </>
    )
}

export default Inicio