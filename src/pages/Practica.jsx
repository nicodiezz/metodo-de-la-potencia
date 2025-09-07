import { useState } from "react";
import "../styles/propagacion-errores-style.css";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

export default function Practica() {
  // Calculadora
  const [x1, setX1] = useState("");
  const [dx1, setDx1] = useState("");
  const [x2, setX2] = useState("");
  const [dx2, setDx2] = useState("");
  const [operacion, setOperacion] = useState("producto");
  const [resultado, setResultado] = useState(null);

  // Ejemplos
  const [mostrarEj7, setMostrarEj7] = useState(false);
  const [mostrarPaso7, setMostrarPaso7] = useState(false);
  const [mostrarEj8, setMostrarEj8] = useState(false);
  const [mostrarPaso8, setMostrarPaso8] = useState(false);

  const calcular = () => {
    const val1 = parseFloat(x1);
    const val2 = parseFloat(x2);
    const err1 = parseFloat(dx1);
    const err2 = parseFloat(dx2);

    if ([val1, val2, err1, err2].some(Number.isNaN)) {
      setResultado("⚠️ Ingrese valores válidos");
      return;
    }

    let valor, delta, relativo;

    if (operacion === "producto") {
      // f = x1 * x2
      valor = val1 * val2;
      // Δf = |x2|Δx1 + |x1|Δx2
      delta = Math.abs(val2) * err1 + Math.abs(val1) * err2;
      // ε(f) = ε(x1) + ε(x2)
      relativo = err1 / Math.abs(val1) + err2 / Math.abs(val2);
    } else if (operacion === "cociente") {
      // f = x1 / x2
      valor = val1 / val2;
      // Δf = Δx1/|x2| + |x1|/x2^2 * Δx2
      delta = err1 / Math.abs(val2) + (Math.abs(val1) / (val2 * val2)) * err2;
      // ε(f) = ε(x1) + ε(x2)
      relativo = err1 / Math.abs(val1) + err2 / Math.abs(val2);
    }

    setResultado({ valor, delta, relativo: relativo * 100 });
  };

  return (
    <div className="page-container">
      <div className="header-text">
      <h2>Calculadora de Propagación de Errores</h2>
      </div>
      {/* CALCULADORA */}
      <div className="math-container">
  <div className="form-grid">
    <div className="field" style={{ marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <label style={{ width: "120px" }}>Valor x₁</label>
      <input
        type="number"
        value={x1}
        onChange={(e) => setX1(e.target.value)}
        placeholder="Ej: 110"
        style={{ width: "200px" }}
      />
    </div>

    <div className="field" style={{ marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <label style={{ width: "120px" }}>Error Δx₁</label>
      <input
        type="number"
        value={dx1}
        onChange={(e) => setDx1(e.target.value)}
        placeholder="Ej: 2.2"
        style={{ width: "200px" }}
      />
    </div>

    <div className="field" style={{ marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <label style={{ width: "120px" }}>Valor x₂</label>
      <input
        type="number"
        value={x2}
        onChange={(e) => setX2(e.target.value)}
        placeholder="Ej: 2"
        style={{ width: "200px" }}
      />
    </div>

    <div className="field" style={{ marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <label style={{ width: "120px" }}>Error Δx₂</label>
      <input
        type="number"
        value={dx2}
        onChange={(e) => setDx2(e.target.value)}
        placeholder="Ej: 0.02"
        style={{ width: "200px" }}
      />
    </div>

    <div className="field full" style={{ marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <label style={{ width: "120px" }}>Operación</label>
      <select
        value={operacion}
        onChange={(e) => setOperacion(e.target.value)}
        style={{ width: "200px" }}
      >
        <option value="producto">Producto (x₁·x₂)</option>
        <option value="cociente">Cociente (x₁/x₂)</option>
      </select>
    </div>

    <div className="actions" style={{ textAlign: "center" }}>
      <button className="btn" onClick={calcular}>Calcular</button>
    </div>
  </div>

  {resultado && (
    <div className="result-box">
      {typeof resultado === "string" ? (
        <p>{resultado}</p>
      ) : (
        <>
          <h3>Resultados</h3>
          <div className="results-grid">
            <div className="label">Valor:</div>
            <div className="value">{resultado.valor.toFixed(4)}</div>

            <div className="label">Cota error absoluto Δf:</div>
            <div className="value">{resultado.delta.toExponential(3)}</div>

            <div className="label">Error relativo %:</div>
            <div className="value">{resultado.relativo.toFixed(2)}%</div>
          </div>
        </>
      )}
    </div>
  )}
</div>



      {/* EJEMPLOS PRÁCTICOS */}
      <div className="header-text">
      <h2>Ejemplos prácticos</h2>
      </div>
      {/* EJERCICIO 7 */}
      <button className="btn" onClick={() => setMostrarEj7(!mostrarEj7)}>
        Ejercicio 7 – Ley de Ohm (Cociente)
      </button>

      {mostrarEj7 && (
        <div className="math-container">
          <h3>Ejercicio 7: Ley de Ohm</h3>
          <p>Se mide la resistencia:</p>
          <BlockMath math="R = \frac{V}{I}" />
          <BlockMath math="V = 110 \, \pm 2.2 \quad \text{(2\%)}" />
          <BlockMath math="I = 2.0 \, \pm 0.02 \quad \text{(1\%)}" />
          <p>Resultado:</p>
          <BlockMath math="R = 55 \, \Omega" />
          <BlockMath math="\varepsilon^{*}(R) = 0.02 + 0.01 = 0.03 \; (3\%)" />
          <BlockMath math="\Delta R = 0.03 \cdot 55 = 1.65 \, \Omega" />
          <BlockMath math="R \in [53.35 \, , \, 56.65] \, \Omega" />

          {!mostrarPaso7 && (
            <button className="btn" onClick={() => setMostrarPaso7(true)}>
              Ver paso a paso
            </button>
          )}

          {mostrarPaso7 && (
            <div className="step-box">
              <h4>Paso a paso</h4>
              <ol>
                <li>Fórmula <BlockMath math="R = \frac{V}{I}" /></li>
                <li>Valor nominal <BlockMath math="R = \frac{110}{2.0} = 55 \, \Omega" /></li>
                <li>Errores relativos
                  <BlockMath math="\varepsilon^{*}(V) = \frac{2.2}{110} = 0.02 \; (2\%)" />
                  <BlockMath math="\varepsilon^{*}(I) = \frac{0.02}{2.0} = 0.01 \; (1\%)" />
                </li>
                <li>Suma <BlockMath math="\varepsilon^{*}(R) = 0.02 + 0.01 = 0.03 \; (3\%)" /></li>
                <li>Error absoluto <BlockMath math="\Delta R = 0.03 \cdot 55 = 1.65 \, \Omega" /></li>
                <li>Intervalo <BlockMath math="R \in [53.35, \; 56.65] \, \Omega" /></li>
              </ol>
            </div>
          )}
        </div>
      )}

      {/* EJERCICIO 8 */}
      <button className="btn" onClick={() => setMostrarEj8(!mostrarEj8)}>
        Ejercicio 8 – Área del triángulo (Producto)
      </button>

      {mostrarEj8 && (
        <div className="math-container">
          <h3>Ejercicio 8: Área de triángulo</h3>
          <p>Con dos lados y el ángulo comprendido:</p>
          <BlockMath math="A = \tfrac{1}{2} \, b \cdot c \cdot \sin(\alpha)" />
          <p>Datos (de la figura):</p>
          <BlockMath math="b = 485.23 \, m \quad \Delta(b) = 0.05 \, m" />
          <BlockMath math="c = 419.82 \, m \quad \Delta(c) = 0.005 \, m" />
          <BlockMath math="\alpha = 49^\circ 32'20'' \quad \Delta(\alpha) = 10''" />
          <p>Resultados:</p>
          <BlockMath math="A \approx 87{,}922.6 \, m^2" />
          <BlockMath math="\Delta A \approx 16.7 \, m^2" />
          <BlockMath math="A \in [87{,}905.9 \; ; \; 87{,}939.3] \, m^2" />

          {!mostrarPaso8 && (
            <button className="btn" onClick={() => setMostrarPaso8(true)}>
              Ver paso a paso
            </button>
          )}

          {mostrarPaso8 && (
            <div className="step-box">
              <h4>Paso a paso</h4>
              <ol>
                <li>Fórmula <BlockMath math="A = \tfrac{1}{2} \, b \cdot c \cdot \sin(\alpha)" /></li>
                <li>Conversión
                  <BlockMath math="\alpha \approx 49.5389^\circ \approx 0.8646 \, rad" />
                  <BlockMath math="\Delta \alpha = 10'' \approx 4.85 \times 10^{-5} \, rad" />
                </li>
                <li>Derivadas
                  <BlockMath math="\frac{\partial A}{\partial b} = \tfrac{1}{2} c \sin(\alpha)" />
                  <BlockMath math="\frac{\partial A}{\partial c} = \tfrac{1}{2} b \sin(\alpha)" />
                  <BlockMath math="\frac{\partial A}{\partial \alpha} = \tfrac{1}{2} b c \cos(\alpha)" />
                </li>
                <li>Área nominal
                  <BlockMath math="A \approx 87{,}922.6 \, m^2" />
                </li>
                <li>Cota de error
                 
                  <BlockMath math="\Delta A \approx 182.0 \cdot 0.05 + 205.3 \cdot 0.005 + 134{,}800 \cdot 4.85 \times 10^{-5} \approx 16.7 \, m^2" />
                </li>
                <li>Intervalo
                  <BlockMath math="A \in [87{,}905.9 \; ; \; 87{,}939.3] \, m^2" />
                </li>
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
