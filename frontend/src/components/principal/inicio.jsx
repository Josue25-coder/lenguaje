import React, { useEffect } from "react";
import "./inicio.css";

export default function Home() {
  useEffect(() => {
    const alreadySpoken = sessionStorage.getItem("welcome_spoken");

    if (!alreadySpoken) {
      const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "es-ES"; // voz en español
        speechSynthesis.speak(utterance);
      };

      speak(
        "Hola, bienvenido a la aplicación de lenguaje de señas. Aquí podrás capturar, entrenar y practicar tus gestos."
      );

      // ✅ Guardamos bandera para que no se repita
      sessionStorage.setItem("welcome_spoken", "true");
    }
  }, []);

  return (
    <div className="card">
      <h1>👋 Bienvenido a esta página de lenguaje de Señales</h1>
      <p>
        Aquí podrás <strong>capturar</strong> tus propios datos,
        <strong> entrenar</strong> un modelo y finalmente
        <strong> practicar</strong> con él. Descubre lo que puedes hacer:
      </p>

      <div className="features">
        <div className="feature-card feature-capturar">
          <h3>📸 Capturar</h3>
          <p>Registra imágenes o gestos para entrenar el modelo.</p>
        </div>

        <div className="feature-card feature-entrenar">
          <h3>🧠 Entrenar</h3>
          <p>Genera un modelo de IA entrenado con tus propias capturas.</p>
        </div>

        <div className="feature-card feature-practicar">
          <h3>📝 Practicar</h3>
          <p>Pon a prueba lo aprendido y mejora tus habilidades.</p>
        </div>

        <div className="feature-card feature-dataset">
          <h3>📂 Dataset</h3>
          <p>Gestiona datasets personalizados para ampliar tu modelo.</p>
        </div>
      </div>
    </div>
  );
}
