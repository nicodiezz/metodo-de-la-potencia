import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import '../styles/propagacion-errores-style.css';

const steps = [
  {
    id: 1,
    top: "\\Delta^*(u) = \\left| \\frac{\\partial f}{\\partial x_1} \\right| \\Delta^*(x_1) + \\left| \\frac{\\partial f}{\\partial x_2} \\right| \\Delta^*(x_2) + \\ldots + \\left| \\frac{\\partial f}{\\partial x_n} \\right| \\Delta^*(x_n)",
    bottom: "f(x_1, x_2) = \\frac{x_1}{x_2}",
  },
  {
    id: 2,
    top: "\\Delta^*(u) = \\left| \\frac{\\partial f}{\\partial x_1} \\right| \\Delta^*(x_1) + \\left| \\frac{\\partial f}{\\partial x_2} \\right| \\Delta^*(x_2) + \\ldots + \\left| \\frac{\\partial f}{\\partial x_n} \\right| \\Delta^*(x_n)",
    bottom: "\\Delta^*(f) = \\left| \\frac{\\partial}{\\partial x_1}\\left(\\frac{x_1}{x_2}\\right) \\right| \\Delta^*(x_1) + \\left| \\frac{\\partial}{\\partial x_2}\\left(\\frac{x_1}{x_2}\\right) \\right| \\Delta^*(x_2)"
  },
  {
    id: 3,
    top: "\\frac{\\partial}{\\partial x_1}\\left(\\frac{x_1}{x_2}\\right) = \\frac{1}{x_2}, \\quad \\frac{\\partial}{\\partial x_2}\\left(\\frac{x_1}{x_2}\\right) = -\\frac{x_1}{(x_2)^2}",
  },
  {
    id: 4,
    top: "\\Delta^*(f) = \\left|\\frac{1}{x_2}\\right| \\Delta^*(x_1) + \\left|\\frac{x_1}{(x_2)^2}\\right| \\Delta^*(x_2)",
  },
  {
    id: 5,
    top: "\\Delta^*(f) = \\frac{\\left|x_2\\right| \\Delta^*(x_1) + \\left|x_1\\right| \\Delta^*(x_2)}{(x_2)^2}",
  },
  {
    id: 6,
    top: "\\varepsilon^*(f) = \\frac{\\Delta^*(f)}{|f|} = \\frac{\\Delta^*(f)}{\\left|\\frac{x_1}{x_2}\\right|}",
  },
  {
    id: 7,
    top: "\\varepsilon^*(f) = \\left|\\frac{x_2}{x_1}\\right|*\\frac{\\left|x_2\\right| \\Delta^*(x_1) + \\left|x_1\\right| \\Delta^*(x_2)}{(x_2)^2}",
  },
  {
    id: 8,
    top: "\\varepsilon^*(f) = \\frac{\\left|x_2\\right| \\Delta^*(x_1) + \\left|x_1\\right| \\Delta^*(x_2)}{\\left|x_2\\right|*\\left|x_1\\right|}",
  },
  {
    id: 9,
    top: "\\varepsilon^*(f) = \\frac{\\left|x_2\\right| \\Delta^*(x_1)}{\\left|x_2\\right|*\\left|x_1\\right|} + \\frac{\\left|x_1\\right| \\Delta^*(x_2)}{\\left|x_2\\right|*\\left|x_1\\right|}",
  },
  {
    id: 10,
    top: "\\varepsilon^*(f) = \\frac{\\Delta^*(x_1)}{|x_1|} + \\frac{\\Delta^*(x_2)}{|x_2|}",
  },
  {
    id: 11,
    top: "\\varepsilon^*\\left(\\frac{x_1}{x_2}\\right) = \\varepsilon^*(x_1) + \\varepsilon^*(x_2)"
  }
];

export default function Cociente() {
  return (
    <div className="page-container">
      <div className="header-text">
      <h2>Propagación de errores en operaciones básicas: Cociente</h2>
      <h3>Enfoque teórico</h3>

      <div
        className="math-container"
        style={{
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        }}
      >
        {steps.map((s) => (
          <div key={s.id} className="math-row" style={{ marginBottom: "16px" }}>
            <BlockMath math={s.top} />
            {s.bottom && <BlockMath math={s.bottom} />}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
