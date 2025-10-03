import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Barrademenu from "./components/Narvar/Barrademenu";
import Inicio from "./components/principal/inicio";
import Capturar from "./components/Capturar/Capturar";
import Entrenar from "./components/Entrenar/Entrenar";
import Practicar from "./components/Practicar/Practicar";
import "./index.css";

function App() {
  return (
    <Router>
      <Barrademenu />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/capturar" element={<Capturar />} />
        <Route path="/entrenar" element={<Entrenar />} />
        <Route path="/practicar" element={<Practicar />} />
      </Routes>
    </Router>
  );
}

export default App;
