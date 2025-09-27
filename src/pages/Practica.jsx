import React, { useEffect, useState } from "react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import "./styles/Practica.css";

const pretty = (v, digits = 6) => {
  if (!isFinite(v)) return "NaN";
  return Number(v).toFixed(digits);
};

const makeDefaultMatrix = (n) => {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
};

const matrixToLatex = (M, digits = 6) => {
  const rows = M.map(row => row.map(v => pretty(v, digits)).join(" & ")).join(" \\\\ ");
  return `\\begin{bmatrix}${rows}\\end{bmatrix}`;
};

const vectorToLatex = (v, digits = 6) => {
  const rows = v.map(x => pretty(x, digits)).join(" \\\\ ");
  return `\\begin{bmatrix}${rows}\\end{bmatrix}`;
};

const multiplyMatVec = (A, x) => {
  const n = A.length;
  const y = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let j = 0; j < n; j++) s += (Number(A[i][j]) || 0) * (Number(x[j]) || 0);
    y[i] = s;
  }
  return y;
};

const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const norm = (v) => Math.sqrt(dot(v, v));
const maxAbs = (v) => Math.max(...v.map(x => Math.abs(x)));

export default function Practica() {
  const [n, setN] = useState(2);
  const [matrix, setMatrix] = useState(() => makeDefaultMatrix(2));
  const [iterations, setIterations] = useState(10);
  const [tol, setTol] = useState(1e-6);

  const [vectorMode, setVectorMode] = useState("default");
  const [customVec, setCustomVec] = useState([1, 0]);

  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const [exampleResult, setExampleResult] = useState(null);
  const [showResolution, setShowResolution] = useState(false);

  useEffect(() => {
    setMatrix(makeDefaultMatrix(n));
    setCustomVec(prev => {
      const next = new Array(n).fill(0);
      for (let i = 0; i < Math.min(prev.length, n); i++) next[i] = prev[i];
      if (prev.length < n) next[0] = next[0] || 1;
      return next;
    });
  }, [n]);

  useEffect(() => {
    const A = [
      [0.7, 0.6],
      [0.3, 0.4],
    ];
    const x0 = [1, 0];
    const res = runPowerMethod(A, x0, { maxIter: 10, tol: 1e-9, normalizeBy: "max" });
    setExampleResult({ A, x0, ...res });
  }, []);

  function updateCell(i, j, value) {
    const newM = matrix.map(row => row.slice());
    newM[i][j] = value; // Guardamos como string
    setMatrix(newM);
  }

  function updateCustomVec(i, value) {
    setCustomVec(prev => {
    const next = prev.slice();
    next[i] = value; // Guardamos como string
    return next;
    });
  }

  function parseInitialVec(n, mode, custom) {
    if (mode === "default") {
      const v = new Array(n).fill(0);
      v[0] = 1;
      return v;
    }
    const v = new Array(n).fill(0);
    for (let i = 0; i < Math.min(n, custom.length); i++) v[i] = Number(custom[i]) || 0;
    return v;
  }

  function handleCompute() {
  const A = matrix.map(row => row.map(v => parseFloat(v.toString().replace(",", ".")) || 0));
  const x0 = parseInitialVec(n, vectorMode, customVec.map(v => parseFloat(v.toString().replace(",", ".")) || 0));
  const res = runPowerMethod(A, x0, { maxIter: Number(iterations), tol: Number(tol), normalizeBy: "max" });
  setResult({ A, x0, ...res });
  setShowResult(true);
}

  function runPowerMethod(A, x0, { maxIter = 100, tol = 1e-10, normalizeBy = "max" } = {}) {
    const n = A.length;
    let x = x0.slice();
    if (x.length !== n) {
      x = new Array(n).fill(0);
      x[0] = 1;
    }
    const iters = [];
    let converged = false;

    for (let k = 0; k < maxIter; k++) {
      const y = multiplyMatVec(A, x);
      const lambda = dot(x, y) / Math.max(1e-15, dot(x, x));
      let scale = normalizeBy === "max" ? maxAbs(y) || 1 : norm(y) || 1;
      const xNext = y.map(v => v / scale);
      const diff = norm(xNext.map((v, i) => v - x[i]));
      iters.push({ k: k + 1, x: x.slice(), y: y.slice(), xNext: xNext.slice(), lambda, diff });
      x = xNext;
      if (diff < tol) {
        converged = true;
        break;
      }
    }

    if (iters.length === maxIter && iters[iters.length - 1].diff >= tol) {
      converged = false;
    }

    const yFinal = multiplyMatVec(A, x);
    const lambdaFinal = dot(x, yFinal) / Math.max(1e-15, dot(x, x));
    const sum = x.reduce((s, v) => s + v, 0) || 1;
    const eigenProb = x.map(v => v / sum);

    return { iterations: iters, eigenvector: x, eigenvalue: lambdaFinal, eigenProb, converged };
  }

  function handleCompute() {
    const A = matrix.map(row => row.map(v => Number(v) || 0));
    const x0 = parseInitialVec(n, vectorMode, customVec);
    const res = runPowerMethod(A, x0, { maxIter: Number(iterations), tol: Number(tol), normalizeBy: "max" });
    setResult({ A, x0, ...res });
    setShowResult(true);
  }

  const exampleLatex = () => {
    if (!exampleResult) return null;
    const iter1 = `x^{(1)} = A\\cdot x^{(0)} =
\\begin{bmatrix}0.7 & 0.6 \\\\ 0.3 & 0.4\\end{bmatrix} \\cdot \\begin{bmatrix}1 \\\\ 0\\end{bmatrix} = \\begin{bmatrix}0.7 \\\\ 0.3\\end{bmatrix}`;
    const iter2 = `x^{(2)} = A\\cdot x^{(1)} = \\begin{bmatrix}0.7\\cdot 0.7 + 0.6\\cdot 0.3 \\\\ 0.3\\cdot 0.7 + 0.4\\cdot 0.3\\end{bmatrix} = \\begin{bmatrix}0.67 \\\\ 0.33\\end{bmatrix}`;
    const iter3 = `x^{(3)} = A\\cdot x^{(2)} = \\begin{bmatrix}0.7\\cdot 0.67 + 0.6\\cdot 0.33 \\\\ 0.3\\cdot 0.67 + 0.4\\cdot 0.33\\end{bmatrix} = \\begin{bmatrix}0.669 \\\\ 0.331\\end{bmatrix}`;
    const conclusion = `x \\approx \\begin{bmatrix}0.667 \\\\ 0.333\\end{bmatrix}`;
    return { iter1, iter2, iter3, conclusion };
  };

  const latex = exampleLatex();

  return (
    <div className="page">
      {/* CALCULADORA */}
      <div className="card calculator">
        <div className="calculator-inner">
          <h2 className="card-title">Calculadora — configura tu matriz</h2>

          <div className="controls-row">
            <label>
              Tamaño (n):
              <select value={n} onChange={e => setN(Number(e.target.value))} className="select">
                {[2,3,4,5,6].map(m => <option key={m} value={m}>{m}×{m}</option>)}
              </select>
            </label>

            <label>
              Iteraciones máximas:
              <input type="number" min={1} value={iterations} onChange={e => setIterations(e.target.value)} className="input-small"/>
            </label>

            <label>
              Tolerancia:
              <input type="number" step="1e-6" value={tol} onChange={e => setTol(e.target.value)} className="input-small"/>
            </label>
          </div>

          <div className="matrix-area centered-content">
            {/* MATRIZ */}
            <div>
              <div className="subtitle">Matriz A (edita las entradas):</div>
              <table className="matrix-table">
                <tbody>
                  {matrix.map((row, i) => (
                    <tr key={i}>
                      {row.map((val, j) => (
                        <td key={j}>
                          <input
                            className="cell-input"
                            value={val === "" ? "" : val}
                            onChange={(e) => updateCell(i, j, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* VECTOR */}
            <div className="vector-box">
              <div className="subtitle">Vector inicial</div>

              <div className="vector-options">
                <label>
                  <input type="radio" checked={vectorMode === "default"} onChange={() => setVectorMode("default")} />
                  Vector por defecto: <code>[1, 0, ...]</code>
                </label>
                <label>
                  <input type="radio" checked={vectorMode === "custom"} onChange={() => setVectorMode("custom")} />
                  Vector personalizado
                </label>
              </div>

              {vectorMode === "custom" && (
                <div className="custom-vector-row">
                  {customVec.map((v, i) => (
                    <input
                      key={i}
                      className="cell-input vector-cell"
                      value={v}
                      onChange={(e) => updateCustomVec(i, e.target.value)}
                    />
                  ))}
                </div>
              )}

              <div className="center-btn">
                <button className="btn" onClick={handleCompute}>Calcular</button>
              </div>
            </div>
          </div>

          {/* RESULTADOS DEL USUARIO */}
          {result && showResult && (
            <div className="results-section">
              <h3 className="card-title">Resultados</h3>

              <div className="centered-math">
                <div><b>Matriz A:</b></div>
                <BlockMath math={matrixToLatex(result.A, 4)} />
                <div><b>Vector inicial:</b></div>
                <BlockMath math={vectorToLatex(result.x0, 4)} />
              </div>

              <div className="iterations">
                <h4>Iteraciones (resumen)</h4>
                {result.iterations.map(it => (
                  <div key={it.k} className="iter-block">
                    <div><b>Iteración {it.k}</b> — diferencia: {pretty(it.diff,6)}</div>
                    <div className="iter-math">
                      <div><small>x^{it.k - 1}:</small><BlockMath math={vectorToLatex(it.x,4)} /></div>
                      <div><small>A·x:</small><BlockMath math={vectorToLatex(it.y,4)} /></div>
                      <div><small>x^{it.k} (normalizada):</small><BlockMath math={vectorToLatex(it.xNext,4)} /></div>
                    </div>
                    <div>Estimación λ ≈ {pretty(it.lambda,6)}</div>
                  </div>
                ))}
              </div>

              <div className="final-conclusion">
                <b>Estimación final:</b>
                {!result.converged && <p style={{ color: "red" }}>⚠️ No converge en las iteraciones indicadas</p>}
                <div>Autovalor dominante λ ≈ {pretty(result.eigenvalue,6)}</div>
                <div>Autovector (normalizado para suma = 1):</div>
                <BlockMath math={vectorToLatex(result.eigenProb,4)} />
              </div>

              {/* BOTÓN OCULTAR AL FINAL */}
              <div className="center-btn" style={{ marginTop: 12 }}>
                <button className="btn outline" onClick={() => setShowResult(false)}>
                  Ocultar resolución
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* EJEMPLO */}
      <div className="card example-card">
        <h3 className="card-title">Ejercicio de ejemplo:</h3>

        <div className="example-enunciado">
          <p>Imaginemos una fábrica con 2 áreas:</p>
          <p><b>Producción (P)</b></p>
          <p><b>Control de calidad (C)</b></p>
          <p>Cada día, una parte de los recursos (tiempo, trabajadores, energía) pasa de un área a la otra:</p>
          <p>El 70% de lo que está en Producción se queda ahí y el 30% pasa a Control.</p>
          <p>El 60% de lo que está en Control vuelve a Producción y el 40% se queda en Control.</p>
          <p>Esto se modela con la matriz:</p>

          {exampleResult && (
            <BlockMath math={`A = ${matrixToLatex(exampleResult.A, 3)}`} />
          )}

          {showResolution && exampleResult && (
            <div className="resolution">
              <hr style={{ width: "80%", margin: "18px auto" }} />
              <h4>Ejercicio con el método de la potencia</h4>
              <p>Queremos encontrar el estado estable (autovector dominante).</p>
              <p><b>Vector inicial (todo en Producción):</b></p>
              <BlockMath math={`x^{(0)} = ${vectorToLatex(exampleResult.x0, 3)}`} />

              <h5>Iteración 1:</h5>
              <BlockMath math={latex.iter1} />
              <h5>Iteración 2:</h5>
              <BlockMath math={latex.iter2} />
              <h5>Iteración 3:</h5>
              <BlockMath math={latex.iter3} />

              <h5>📌 Conclusión</h5>
              <p>El vector converge a:</p>
              <BlockMath math={latex.conclusion} />
              <p>Es decir, en el largo plazo:</p>
              <p><b>66.7% de los recursos estarán en Producción</b></p>
              <p><b>33.3% en Control de calidad</b></p>
              <p>El autovalor dominante es <b>λ = 1</b>.</p>

              {/* BOTÓN OCULTAR AL FINAL */}
              <div className="center-btn" style={{ marginTop: 12 }}>
                <button className="btn outline" onClick={() => setShowResolution(false)}>
                  Ocultar resolución
                </button>
              </div>
            </div>
          )}

          {/* BOTÓN VER RESOLUCIÓN para mostrar */}
          {!showResolution && (
            <div className="center-btn" style={{ marginTop: 12 }}>
              <button className="btn outline" onClick={() => setShowResolution(true)}>
                Ver resolución
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
