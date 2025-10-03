import { useState, useEffect } from "react";
import { API } from "../api";
import "./Practicar.css";

export default function Practicar() {
  // ✅ Cargar categoría desde localStorage si existe
  const [category, setCategory] = useState(() => {
    return localStorage.getItem("practicar_category") || "";
  });
  const [feedUrl, setFeedUrl] = useState(null);

  // ✅ Guardar categoría cada vez que cambia
  useEffect(() => {
    if (category) {
      localStorage.setItem("practicar_category", category);
    }
  }, [category]);

  const handleStartPractice = () => {
    if (!category) return alert("Indica una categoría");
    setFeedUrl(`${API}/predict_feed?category=${category}`);
  };

  return (
    <div className="practicar-container">
      <div className="practicar-card">
        <h2>🎯 Practicar Señales</h2>

        <div className="practice-form">
          <input
            placeholder="Categoría entrenada"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button onClick={handleStartPractice}>
            Iniciar Práctica
          </button>
        </div>

        {feedUrl && (
          <div className="practice-feed">
            <img src={feedUrl} alt="Predict feed" />
          </div>
        )}
      </div>
    </div>
  );
}
