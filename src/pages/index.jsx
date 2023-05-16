import { Navigate } from "react-router-dom";
  







//export const Inicio = (user) => {user && <h2>Inicio pagina {user.group_name}</h2>};

export const Dashboard = () => <h2>Dashboard (Private)</h2>;

export const Analytics = () => (
  <h2>Profile (Private & permission 'analize')</h2>
);

export const Admin = () => <h2>Admin (Private & permission 'admin')</h2>;
