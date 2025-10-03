import { Link, useLocation } from "react-router-dom";
import "./barra.css";

export default function Barrademenu() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Inicio" },
    { path: "/capturar", label: "Capturar" },
    { path: "/entrenar", label: "Entrenar" },
    { path: "/practicar", label: "Practicar" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          🖐️ Leng de Señas
        </Link>

        {/* Links */}
        <div className="navbar-links">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-link ${
                location.pathname === link.path ? "active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
