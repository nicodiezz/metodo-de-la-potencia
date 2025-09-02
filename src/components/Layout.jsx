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
      </main>
    </div>
  )
}

export default Layout