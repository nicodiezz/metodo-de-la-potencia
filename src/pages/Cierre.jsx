import "./styles/Cierre.css";

const Cierre = () => {
  return (
    <div className="cierre-container">
      <div className="content-wrapper">
        
        {/* Título Principal */}
        <div className="header-section">
          <h1 className="main-title">Utilidad</h1>
          <p className="subtitle">Método de la Potencia en el mundo real</p>
        </div>

        {/* Ejemplos de la vida real */}
        <section className="examples-section">
          <h2 className="section-title">
            Ejemplos de la vida real
          </h2>
          
          <div className="examples-grid">
            <div className="example-card google">
              <div className="card-icon">🔍</div>
              <h3>Google PageRank</h3>
            </div>

            <div className="example-card social">
              <div className="card-icon">📱</div>
              <h3>Redes Sociales</h3>
            </div>

            <div className="example-card engineering">
              <div className="card-icon">🏗️</div>
              <h3>Vibraciones en Ingeniería</h3>
            </div>
          </div>
        </section>

        {/* Ventajas y Limitaciones */}
        <div className="analysis-grid">
          
          {/* Ventajas */}
          <section className="advantages-section">
            <h2 className="section-title">
              Ventajas
            </h2>
            
            <div className="advantages-list">
              <div className="advantage-item">
                <h3>Simplicidad</h3>
              </div>
              
              <div className="advantage-item">
                <h3>Escalabilidad</h3>
              </div>
            </div>
          </section>

          {/* Limitaciones */}
          <section className="limitations-section">
            <h2 className="section-title">
              Limitaciones
            </h2>
            
            <div className="limitations-list">
              <div className="limitation-item">No es práctico a mano</div>
              <div className="limitation-item">Solo matrices cuadradas</div>
              <div className="limitation-item">Convergencia lenta</div>
              <div className="limitation-item">Vector inicial crítico</div>
            </div>
          </section>
        </div>

        {/* Conclusión */}
        <section className="conclusion-section">
          <h2>¡Gracias por su atención!</h2>
          <p>El Método de la Potencia: Simple, poderoso y presente en nuestro día a día</p>
        </section>
      </div>
    </div>
  );
};

export default Cierre;