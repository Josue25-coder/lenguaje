import { useState, useEffect } from "react";
import { startCapture, stopCapture, API } from "../api";
import "./Capturar.css";

export default function Capturar() {
  const [categories] = useState(["Vocales", "Abecedario", "Números" ,"Operaciones matematicas"]);

  // ✅ Cargar desde localStorage al iniciar
  const [category, setCategory] = useState(() => {
    return localStorage.getItem("capturar_category") || "";
  });
  const [label, setLabel] = useState(() => {
    return localStorage.getItem("capturar_label") || "";
  });
  const [capturing, setCapturing] = useState(false);

  // ✅ Guardar automáticamente en localStorage cuando cambie
  useEffect(() => {
    if (category) localStorage.setItem("capturar_category", category);
  }, [category]);

  useEffect(() => {
    if (label) localStorage.setItem("capturar_label", label);
  }, [label]);

  const handleStart = async () => {
    if (!category || !label) return alert("Selecciona categoría y pon label");
    await startCapture(category, label);
    setCapturing(true);
  };

  const handleStop = async () => {
    await stopCapture();
    setCapturing(false);
  };

  const handleDownload = () => {
    if (!category) return alert("Selecciona una categoría para descargar");
    window.open(`${API}/download_dataset?category=${category}`, "_blank");
  };

  return (
    <div className="capturar-container">
      <h2>📸 Capturar Señales</h2>

      <div className="cards-grid">
        {/* Card izquierda: Configuración */}
        <div className="card config-card">
          <h3>⚙️ Configuración</h3>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="dropdown"
          >
            <option value="">-- Selecciona categoría --</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Label (ej: a, b, c o número)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          <div className="btn-group">
            {!capturing ? (
              <button onClick={handleStart} className="btn-action start">
                ▶ Iniciar Captura
              </button>
            ) : (
              <button onClick={handleStop} className="btn-action stop">
                ⏹ Detener Captura
              </button>
            )}

            <button onClick={handleDownload} className="btn-action save">
              💾 Descargar Dataset
            </button>
          </div>
        </div>

        {/* Card derecha: Cámara */}
        <div className="card camera-card">
          <h3>🎥 Vista de Cámara</h3>
          <div className="camera-feed">
            <img src={`${API}/video_feed`} alt="Video" />
          </div>
        </div>
      </div>
    </div>
  );
}
