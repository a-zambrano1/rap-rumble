import "../../styles/App.css";
import IngresoJuez from "../Views/ingresoJuez";
import Votacion from "../Views/votacion";
import Jornada from "../Views/jornada";
import Inicio from "../Views/inicio";
import InicioBatalla from "../Views/inicioBatalla";
import { Routes, BrowserRouter, Route } from "react-router-dom";


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/ingreso_juez" element={<IngresoJuez />} />
          <Route path="/votacion" element={<Votacion />} />
          <Route path="/jornada" element={<Jornada />} />
          <Route path="/inicio_batalla" element={<InicioBatalla />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
