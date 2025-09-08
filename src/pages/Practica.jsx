import { useState } from "react";
import "../styles/propagacion-errores-style.css";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

export default function Practica() {
  // Calculadora (centrada)
  const [x1, setX1] = useState("");
  const [dx1, setDx1] = useState("");
  const [x2, setX2] = useState("");
  const [dx2, setDx2] = useState("");
  const [operacion, setOperacion] = useState("producto");
  const [resultado, setResultado] = useState(null);

  // Ejemplos
  const [mostrarEj7, setMostrarEj7] = useState(false);
  const [mostrarPaso7, setMostrarPaso7] = useState(false);

  // Ejercicio 9
  const [mostrarEj9, setMostrarEj9] = useState(false);
  const [mostrarResultado9, setMostrarResultado9] = useState(false);
  const [mostrarResolucion9, setMostrarResolucion9] = useState(false);

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
      valor = val1 * val2;
      delta = Math.abs(val2) * err1 + Math.abs(val1) * err2;
      relativo = err1 / Math.abs(val1) + err2 / Math.abs(val2);
    } else {
      valor = val1 / val2;
      delta = err1 / Math.abs(val2) + (Math.abs(val1) / (val2 * val2)) * err2;
      relativo = err1 / Math.abs(val1) + err2 / Math.abs(val2);
    }

    setResultado({ valor, delta, relativo: relativo * 100 });
  };

  return (
    <div className="page-container">
      <div className="header-text">
        <h2>Calculadora de Propagación de Errores</h2>
      </div>

      {/* CALCULADORA (centrada) */}
      <div className="math-container">
        <div className="form-grid">

          <div
            className="field"
            style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <label style={{ width: 120 }}>Valor x₁</label>
            <input
              type="number"
              value={x1}
              onChange={(e) => setX1(e.target.value)}
              placeholder="Ej: 110"
              style={{ width: 200 }}
            />
          </div>

          <div
            className="field"
            style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <label style={{ width: 120 }}>Error Δx₁</label>
            <input
              type="number"
              value={dx1}
              onChange={(e) => setDx1(e.target.value)}
              placeholder="Ej: 2.2"
              style={{ width: 200 }}
            />
          </div>

          <div
            className="field"
            style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <label style={{ width: 120 }}>Valor x₂</label>
            <input
              type="number"
              value={x2}
              onChange={(e) => setX2(e.target.value)}
              placeholder="Ej: 2"
              style={{ width: 200 }}
            />
          </div>

          <div
            className="field"
            style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <label style={{ width: 120 }}>Error Δx₂</label>
            <input
              type="number"
              value={dx2}
              onChange={(e) => setDx2(e.target.value)}
              placeholder="Ej: 0.02"
              style={{ width: 200 }}
            />
          </div>

          <div
            className="field full"
            style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <label style={{ width: 120 }}>Operación</label>
            <select
              value={operacion}
              onChange={(e) => setOperacion(e.target.value)}
              style={{ width: 200 }}
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
          <BlockMath math={"R = \\frac{V}{I}"} />
          <BlockMath math={"V = 110 \\, \\pm 2.2 \\quad \\text{(2\\%) }"} />
          <BlockMath math={"I = 2.0 \\, \\pm 0.02 \\quad \\text{(1\\%) }"} />
          <p>Resultado:</p>
          <BlockMath math={"R = 55 \\; \\Omega"} />
          <BlockMath math={"\\varepsilon^{*}(R) = 0.02 + 0.01 = 0.03 \\; (3\\%)"} />
          <BlockMath math={"\\Delta R = 0.03 \\cdot 55 = 1.65 \\; \\Omega"} />
          <BlockMath math={"R \\in [53.35, \\; 56.65] \\; \\Omega"} />

          {!mostrarPaso7 && (
            <button className="btn" onClick={() => setMostrarPaso7(true)}>
              Ver paso a paso
            </button>
          )}

          {mostrarPaso7 && (
            <div className="step-box">
              <h4>Paso a paso</h4>
              <ol>
                <li>Fórmula <BlockMath math={"R = \\frac{V}{I}"} /></li>
                <li>Valor nominal <BlockMath math={"R = \\frac{110}{2.0} = 55 \\; \\Omega"} /></li>
                <li>Errores relativos
                  <BlockMath math={"\\varepsilon^{*}(V) = \\frac{2.2}{110} = 0.02 \\; (2\\%)"} />
                  <BlockMath math={"\\varepsilon^{*}(I) = \\frac{0.02}{2.0} = 0.01 \\; (1\\%)"} />
                </li>
                <li>Suma <BlockMath math={"\\varepsilon^{*}(R) = 0.02 + 0.01 = 0.03 \\; (3\\%)"} /></li>
                <li>Error absoluto <BlockMath math={"\\Delta R = 0.03 \\cdot 55 = 1.65 \\; \\Omega"} /></li>
                <li>Intervalo <BlockMath math={"R \\in [53.35, \\; 56.65] \\; \\Omega"} /></li>
              </ol>
            </div>
          )}
        </div>
      )}

      {/* EJERCICIO 9 */}
      <button className="btn" onClick={() => setMostrarEj9(!mostrarEj9)}>
        Ejercicio 9 – Área del rectángulo (Producto)
      </button>

      {mostrarEj9 && (
        <div className="math-container">
          <h3>Ejercicio 9: Área de rectángulo</h3>
          <p>Con lados <strong>a</strong> y <strong>b</strong>:</p>
          <BlockMath math={"A = a \\cdot b"} />
          <p>Datos del problema:</p>
          <BlockMath math={"\\varepsilon^{*}(a) = 0.03 \\quad (3\\%)"} />
          <BlockMath math={"\\varepsilon^{*}(b) = 0.04 \\quad (4\\%)"} />

          {!mostrarResultado9 && (
            <button className="btn" onClick={() => setMostrarResultado9(true)}>
              Calcular
            </button>
          )}

          {mostrarResultado9 && (
            <>
              <p>✅ La cota del error relativo en el cálculo del área es:</p>
              <BlockMath math={"\\varepsilon^{*}(A) = 0.07 \\quad (7\\%)"} />

              {!mostrarResolucion9 && (
                <button className="btn" onClick={() => setMostrarResolucion9(true)}>
                  Ver resolución
                </button>
              )}
            </>
          )}

          {mostrarResolucion9 && (
            <div className="step-box">
              <h4>Paso a paso</h4>
              <ol>
                <li>Fórmula <BlockMath math={"A = a \\cdot b"} /></li>
                <li>Errores relativos dados
                  <BlockMath math={"\\varepsilon^{*}(a) = 0.03, \\; \\varepsilon^{*}(b) = 0.04"} />
                </li>
                <li>Se suman para el producto
                  <BlockMath math={"\\varepsilon^{*}(A) = \\varepsilon^{*}(a) + \\varepsilon^{*}(b) = 0.07"} />
                </li>
                <li>Error absoluto del área (si se conoce a y b)
                  <BlockMath math={"\\Delta A = \\varepsilon^{*}(A) \\cdot (a \\cdot b)"} />
                </li>
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
