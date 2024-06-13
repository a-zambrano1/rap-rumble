import "../../styles/App.css";
import Ingreso from "../Views/ingreso.js";
import Votacion from "../Views/votacion.js";
import Jornada from "../Views/jornada.js";
import Inicio from "../Views/inicio.js";
import InicioBatalla from "../Views/inicioBatalla.js";
import Registro from "../Views/registro.js";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Admin from "../Views/admin.js";
import Welcome from "../Views/welcome.js";
import PrivateRoute from "../Utils/privateRoute.js";
import { AuthProvider } from "../Utils/authContext.js";

function App() {
  return (
    <AuthProvider>
      <div >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/ingreso" element={<Ingreso />} />
            <Route path="/votacion" element={<PrivateRoute><Votacion /></PrivateRoute>} />
            <Route path="/jornada" element={<Jornada />} />
            <Route path="/inicio_batalla" element={<PrivateRoute><InicioBatalla /></PrivateRoute>} />
            <Route path="/registro_usuario" element={<Registro />} />
            <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
            <Route path="/welcome" element={<Welcome />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
