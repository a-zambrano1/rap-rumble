import "../../styles/App.css";
import Ingreso from "./components/Views/ingreso.js";
import Votacion from "./components/Views/votacion.js";
import Jornada from "./components/Views/jornada.js";
import Inicio from "./components/Views/inicio.js";
import InicioBatalla from "./components/Views/inicioBatalla.js";
import Registro from "./components/Views/registro.js";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Admin from "./components/Views/admin.js";
import Welcome from "./components/Views/welcome.js";
import PrivateRoute from "./components/Utils/privateRoute.js";
import { AuthProvider } from "./components/Utils/authContext.js";

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
