import "../../styles/App.css";
import IngresoJuez from "../Views/ingresoJuez";
import Votacion from "../Views/votacion";
import Jornada from "../Views/jornada";
import Inicio from "../Views/inicio";
import InicioBatalla from "../Views/inicioBatalla";
import Registro from "../Views/registro";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Admin from "../Views/admin";
import Welcome from "../Views/welcome";


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio/>} />
          <Route path="/ingreso_juez" element={<IngresoJuez />} />
          <Route path="/votacion" element={<Votacion />} />
          <Route path="/jornada" element={<Jornada />} />
          <Route path="/inicio_batalla" element={<InicioBatalla />} />
          <Route path="/registro_usuario" element={<Registro />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
