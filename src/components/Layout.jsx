import { NavLink } from "react-router-dom"
import "./styles/Layout.css"

function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <div className="logo-section">
          <img src="./logo.png" alt="Logo" className="logo" />
          <span className="group-name">Goodfellas - Teoría de Errores</span>
        </div>
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Inicio
          </NavLink>
          <NavLink to="/producto" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Producto
          </NavLink>
          <NavLink to="/cociente" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Cociente
          </NavLink>
          <NavLink to="/practica" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Práctica
          </NavLink>
        </nav>
      </header>
      <main className="content">
        {children}
        <div className="buttons-final">
          <button
            className="btn-container-back"
            onClick={() => navigate("/")}
          >
            Volver al anterior
          </button>
          <button
            className="btn-container-next"
            onClick={() => navigate("/cociente")}
          >Pasar al siguiente
          </button>
        </div>
      </main>
    </div>
  )
}

export default Layout