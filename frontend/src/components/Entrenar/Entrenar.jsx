import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { trainCategory, uploadDataset, getDatasetStats } from "../api";
import "./Entrenar.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function EntrenarConGrafico() {
  // ✅ carga inicial desde localStorage
  const [category, setCategory] = useState(() => {
    return localStorage.getItem("entrenar_category") || "";
  });
  const [file, setFile] = useState(null);
  const [chartData, setChartData] = useState(null);

  // ✅ guarda cambios en localStorage
  useEffect(() => {
    if (category) {
      localStorage.setItem("entrenar_category", category);
    }
  }, [category]);

  // Entrenar modelo
  const handleTrain = async () => {
    if (!category) return alert("Escribe categoría");
    try {
      const res = await trainCategory(category);
      alert(JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      alert("Error entrenando la categoría");
    }
  };

  // Subir ZIP y generar gráficas
  const handleUpload = async () => {
    if (!file) return alert("Selecciona un archivo");
    if (!category) return alert("Debes indicar una categoría antes de subir");

    try {
      // 1. Subir dataset al backend
      await uploadDataset(file);

      // 2. Pedir estadísticas de esa categoría
      const statsRes = await getDatasetStats(category);

      // 3. Construir data para gráficas
      if (statsRes.data.labels && statsRes.data.values) {
        const data = {
          labels: statsRes.data.labels,
          datasets: [
            {
              label: "Cantidad de ejemplos",
              data: statsRes.data.values,
              borderColor: "#3F6F99",
              backgroundColor: "rgba(63, 111, 153, 0.5)",
              tension: 0.3,
            }
          ]
        };
        setChartData(data);
      }
    } catch (err) {
      console.error(err);
      alert("Error subiendo o graficando el dataset");
    }
  };

  return (
    <div className="entrenar-container">
      <div className="entrenar-card">
        <h2>🧠 Entrenar Modelo</h2>

        <div className="form-section">
          {/* Input de categoría */}
          <div className="entrenar-input">
            <label>Categoría a entrenar</label>
            <input
              type="text"
              placeholder="Ej: gatos"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button onClick={handleTrain} className="entrenar-btn btn-train">
            Entrenar
          </button>

          {/* Input de archivo */}
          <div className="entrenar-input">
            <label>Subir dataset (archivo ZIP)</label>
            <input
              type="file"
              accept=".zip"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button onClick={handleUpload} className="entrenar-btn btn-upload">
            Subir ZIP & Graficar
          </button>
        </div>

        {/* Gráficos */}
        {chartData ? (
          <div className="graficos-grid">
            <div className="grafico-card">
              <h3>📈 Gráfico Lineal</h3>
              <div className="h-[300px]">
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="grafico-card">
              <h3>📊 Gráfico de Barras</h3>
              <div className="h-[300px]">
                <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-[#5D6D75] mt-4 text-sm">
            Elige un ZIP para generar los gráficos
          </p>
        )}
      </div>
    </div>
  );
}
