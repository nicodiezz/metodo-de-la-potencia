import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import '../styles/propagacion-errores-style.css'; 
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

export default function ProductoErrores() {
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [mostrarResolucion, setMostrarResolucion] = useState(false);

  const navigate = useNavigate();

  return (
    <div className='page-container'>
      <h2>Propagación de Errores en Operaciones Básicas (Producto)</h2>
      <h3>📚 Enfoque teórico</h3>
      <div className="math-container">
        <div className="math-row">
          <p>Función:</p>
          <BlockMath math="f(x_1, x_2) = x_1 \cdot x_2" />
        </div>
        <div className="math-row">
          <p>Derivadas parciales:</p>
          <BlockMath math="\frac{\partial f}{\partial x_1} = x_2 \qquad \frac{\partial f}{\partial x_2} = x_1" />
        </div>
        <div className="math-row">
          <p>Cota del error absoluto:</p>
          <BlockMath math="\Delta^{*} f = \frac{\partial f}{\partial x_1} \cdot \Delta x_1 + \frac{\partial f}{\partial x_2} \cdot \Delta x_2" />
        </div>
        <div className="math-row">
          <p>Obtenemos (1):</p>
          <BlockMath math="\Delta^{*}(x_1 \cdot x_2) = x_2 \cdot \Delta x_1 + x_1 \cdot \Delta x_2" /> 
        </div>
        <div className="math-row">
          <p>Error relativo:</p>
          <BlockMath math="\varepsilon^{*}(x_1 \cdot x_2) = \frac{\Delta^{*}(x_1 \cdot x_2)}{\left|\tilde{x}_1 \tilde{x}_2\right|}" />
        </div>
        <div className="math-row">
          <p>Aplicando propiedades y teniendo en cuenta (1):</p>
          <BlockMath math="\varepsilon^{*}(x_1 \cdot x_2) = \frac{\Delta^{*}(x_1)}{\left|\tilde{x}_1\right|} + \frac{\Delta^{*}(x_2)}{\left|\tilde{x}_2\right|}" />
        </div>
        <div className="math-row">
          <p>Cota del error relativo:</p>
          <BlockMath math="\varepsilon^{*}(x_1 \cdot x_2) = \varepsilon^{*}(x_1) + \varepsilon^{*}(x_2)" />
        </div>
      </div>
      <h3>🔢 Enfoque práctico</h3>
      <div className="math-container">
        <h4>Problema N° 9</h4>
        <p>
          Si las longitudes de los lados de un rectángulo tienen:
        </p>
        <BlockMath math="\varepsilon^{*}(a) = 0.03 \qquad \varepsilon^{*}(b) = 0.04" />
        <p>Determinar una cota de error en el cálculo del área.</p>
        {!mostrarResultado && (
          <button 
            className="btn"
            onClick={() => setMostrarResultado(true)}
          >
            Calcular
          </button>
        )}        
        {mostrarResultado && (
          <>
            <p>✅ La cota del error relativo en el cálculo del área es:</p>
            <BlockMath math="\varepsilon^{*}(A) = 0.07 \quad (7\%)" />  
            {!mostrarResolucion && (
              <button 
                className="btn"
                onClick={() => setMostrarResolucion(true)}
              >
                Ver resolución
              </button>
            )}
          </>
        )}
        {mostrarResolucion && (
          <div className="resolucion">
            <p>Aplicamos la fórmula de la cota del error relativo:</p>
            <BlockMath math="\varepsilon^{*}(A) = \varepsilon^{*}(a) + \varepsilon^{*}(b)" />

            <p>Sustituyendo valores:</p>
            <BlockMath math="\varepsilon^{*}(A) = 0.03 + 0.04 = 0.07" />

            <p>Por lo tanto:</p>
            <BlockMath math="\varepsilon^{*}(A) = 0.07 \quad (7\%)" />
          </div>
        )}
      </div>
      <div className="buttons-final">
  <button 
    className="btn-container-back"
    onClick={() => navigate("/")}
  >
    Volver a la introducción
  </button>
  <button 
    className="btn-container-next"
    onClick={() => navigate("/cociente")}
  >Pasar a cociente
</button>
</div>
    </div>
  );
}
