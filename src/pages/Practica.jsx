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

  // EJEMPLO: usamos tol = 0.01 (pocas iteraciones)
  useEffect(() => {
    const A = [
      [0.7, 0.6],
      [0.3, 0.4],
    ];
    const x0 = [1, 0];
    const res = runPowerMethod(A, x0, { maxIter: 50, tol: 0.01 });
    setExampleResult({ A, x0, ...res });
  }, []);

  function updateCell(i, j, value) {
    const newM = matrix.map(row => row.slice());
    newM[i][j] = value;
    setMatrix(newM);
  }

  function updateCustomVec(i, value) {
    setCustomVec(prev => {
      const next = prev.slice();
      next[i] = value;
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
    if (v.every(val => Math.abs(val) < 1e-15)) v[0] = 1;
    return v;
  }

  /**
   * Método de la potencia (NORMALIZACIÓN por norma 2)
   * Estimación de lambda por máximas componentes en cada iteración:
   *   lambdaEst = maxAbs(y) / maxAbs(x_previous)
   *
   * El valor final devuelto (eigenvalue) será LA ÚLTIMA lambdaEst calculada
   * (si hay iteraciones). Si no hay iteraciones, se usa un fallback numérico.
   */
  function runPowerMethod(Araw, x0raw, { maxIter = 100, tol = 1e-10 } = {}) {
    const eps = 1e-15;
    const A = Araw.map(row => row.map(v => Number(v) || 0));
    const n = A.length;
    let x = (x0raw || []).slice().map(v => Number(v) || 0);
    if (x.length !== n) {
      x = new Array(n).fill(0);
      x[0] = 1;
    }

    // normalizamos el vector inicial por norma 2
    let initNorm = norm(x);
    if (initNorm < eps) {
      x = new Array(n).fill(0);
      x[0] = 1;
      initNorm = norm(x);
    }
    x = x.map(v => v / initNorm);

    const iters = [];
    let converged = false;

    for (let k = 0; k < maxIter; k++) {
      const y = multiplyMatVec(A, x);   // y^{(k)} = A * x^{(k-1)}
      const maxY = maxAbs(y);
      const maxX = maxAbs(x);

      // estimación por máximas componentes (si maxX ~ 0 usamos fallback Rayleigh)
      let lambdaEst;
      if (Math.abs(maxX) < eps) {
        const denom = dot(x, x);
        lambdaEst = Math.abs(denom) < eps ? 0 : dot(x, y) / denom;
      } else {
        lambdaEst = maxY / maxX;
      }

      // normalizamos por norma 2 (si ||y|| ~ 0, mantenemos x actual)
      const scale = norm(y);
      let xNext;
      if (scale < eps) {
        xNext = x.slice();
      } else {
        xNext = y.map(v => v / scale);
      }

      // diferencia: norma 2 entre xNext y x (esto es lo que mostramos y usamos para parar)
      const diff = norm(xNext.map((v, i) => v - x[i]));

      iters.push({
        k: k + 1,
        x: x.slice(),
        y: y.slice(),
        xNext: xNext.slice(),
        lambdaEst,
        diff
      });

      x = xNext;

      if (diff < tol) {
        converged = true;
        break; // salimos inmediatamente cuando converge
      }
    }

    // ahora tomamos la λ final = última lambdaEst de iters (si existe)
    let lambdaFinal;
    if (iters.length > 0) {
      lambdaFinal = iters[iters.length - 1].lambdaEst;
      // si por alguna razón no es finito, hacemos un fallback seguro:
      if (!isFinite(lambdaFinal)) {
        const yFinal = multiplyMatVec(A, x);
        const maxYFinal = maxAbs(yFinal);
        const maxXFinal = maxAbs(x);
        if (Math.abs(maxXFinal) < eps) {
          const denom = dot(x, x);
          lambdaFinal = Math.abs(denom) < eps ? 0 : dot(x, yFinal) / denom;
        } else {
          lambdaFinal = maxYFinal / maxXFinal;
        }
      }
    } else {
      // si no hubo iteraciones (caso extremo), computamos fallback
      const yFinal = multiplyMatVec(A, x);
      const maxYFinal = maxAbs(yFinal);
      const maxXFinal = maxAbs(x);
      if (Math.abs(maxXFinal) < eps) {
        const denom = dot(x, x);
        lambdaFinal = Math.abs(denom) < eps ? 0 : dot(x, yFinal) / denom;
      } else {
        lambdaFinal = maxYFinal / maxXFinal;
      }
    }

    const eigenvector = x.map(v => v / (norm(x) || 1));

    return { iterations: iters, eigenvector, eigenvalue: lambdaFinal, converged };
  }

  function handleCompute() {
    const A = matrix.map(row => row.map(v => Number(v) || 0));
    const x0 = parseInitialVec(n, vectorMode, customVec);
    const res = runPowerMethod(A, x0, { maxIter: Number(iterations) || 100, tol: Number(tol) || 1e-6 });
    setResult({ A, x0, ...res });
    setShowResult(true);
  }

  return (
    <div className="page">
      <div className="header-section">
          <h1 className="main-title">Práctica</h1>
          <p className="subtitle">Calculadora y ejemplo de aplicación (estimación por máximas componentes)</p>
      </div>

      {/* CALCULADORA */}
      <div className="card calculator">
        <div className="calculator-inner">
          <h2 className="card-title" style={{ textAlign: "center" }}>Calculadora 🔢</h2>

          <div className="controls-row">
            <label>
              Tamaño (n):
              <select value={n} onChange={e => setN(Number(e.target.value))} className="select">
                {[2,3,4,5,6].map(m => <option key={m} value={m}>{m}×{m}</option>)}
              </select>
            </label>

            <label>
              Iteraciones máximas:
              <input type="number" min={1} value={iterations} onChange={e => setIterations(Number(e.target.value) || 1)} className="input-small"/>
            </label>

            <label>
              Tolerancia:
              <input type="number" step="1e-6" placeholder="1e-6" value={tol} onChange={e => setTol(Number(e.target.value) || 1e-6)} className="input-small"/>
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
                <div><b>Vector inicial (normalizado al inicio):</b></div>
                <BlockMath math={vectorToLatex(result.x0.map(Number), 4)} />
              </div>

              <div className="iterations">
                <h4>Iteraciones (detalle paso a paso)</h4>
                {result.iterations.map(it => (
                  <div key={it.k} className="iter-block">
                    <div style={{ marginBottom: 6 }}><b>Iteración {it.k}</b></div>

                    <div className="iter-math">
                      <div><small>x^{it.k - 1} (normalizado):</small><BlockMath math={vectorToLatex(it.x,4)} /></div>

                      <div><small>y^{it.k} = A · x^{it.k-1} :</small><BlockMath math={vectorToLatex(it.y,4)} /></div>

                      <div style={{ marginTop: 6 }}><small>x^{it.k} (normalizada):</small><BlockMath math={vectorToLatex(it.xNext,4)} /></div>
                    </div>

                    <div style={{ marginTop: 6 }}>Estimación λ^{it.k} ≈ {pretty(it.lambdaEst,6)}</div>
                  </div>
                ))}
              </div>

              <div className="final-conclusion">
                <b>Estimación final:</b>
                {!result.converged && <p style={{ color: "red" }}>⚠️ No converge en las iteraciones indicadas</p>}
                <div>Autovalor dominante λ ≈ {pretty(result.eigenvalue,6)}</div>
                <div>Autovector:</div>
                <BlockMath math={vectorToLatex(result.eigenvector,4)} />
              </div>

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
        <h2 className="card-title">Ejercicio de ejemplo 🏭</h2>

        <div className="example-enunciado">
          <p>Imaginemos una fábrica con 2 áreas:</p>
          <p><b>Producción (P)</b></p>
          <p><b>Control de calidad (C)</b></p>
          <p>El 70% de Producción se queda, 30% pasa a Control.</p>
          <p>El 60% de Control vuelve a Producción, 40% se queda.</p>
          <p>Esto se modela con la matriz:</p>

          {exampleResult && (
            <BlockMath math={`A = ${matrixToLatex(exampleResult.A, 3)}`} />
          )}

          <div style={{ marginTop: 8 }}>

            <p style={{ fontSize: 14 }}>En este ejemplo usamos <b>tolerancia = 0.01</b> para que converja en pocas iteraciones.</p>
          </div>

          {showResolution && exampleResult && (
            <div className="resolution">
              <hr style={{ width: "80%", margin: "18px auto" }} />
              <h4>Ejercicio con el método de la potencia (detalle por iteración)</h4>
              <p><b>Vector inicial (normalizado):</b></p>
              <BlockMath math={`x^{(0)} = ${vectorToLatex(exampleResult.iterations && exampleResult.iterations.length ? exampleResult.iterations[0].x : exampleResult.x0, 4)}`} />

              {exampleResult.iterations.map(it => (
                <div key={it.k} style={{ marginBottom: 12 }}>
                  <h5>Iteración {it.k}:</h5>
                  <div><small>x^{it.k - 1} (normalizado):</small><BlockMath math={vectorToLatex(it.x,4)} /></div>
                  <div><small>y^{it.k} = A·x^{it.k-1} :</small><BlockMath math={vectorToLatex(it.y,4)} /></div>
                  <div style={{ marginTop: 6 }}><small>x^{it.k} (normalizada):</small><BlockMath math={vectorToLatex(it.xNext,4)} /></div>
                  
                </div>
              ))}

              <h5>📌 Conclusión</h5>
              <p>El vector converge a:</p>
              <BlockMath math={vectorToLatex(exampleResult.eigenvector,4)} />
              <p>El autovalor dominante estimado (última estimación por máximas componentes) es <b>λ ≈ {pretty(exampleResult.eigenvalue,6)}</b>.</p>

              <div className="center-btn" style={{ marginTop: 12 }}>
                <button className="btn outline" onClick={() => setShowResolution(false)}>
                  Ocultar resolución
                </button>
              </div>
            </div>
          )}

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
