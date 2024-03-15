import './App.css';
import ingreso_juez from '../Views/ingreso_juez';


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/ingreso_juez" element={<IngresoJuez />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
