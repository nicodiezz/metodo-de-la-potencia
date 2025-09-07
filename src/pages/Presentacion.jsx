import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'
import './styles/Presentacion.css'

function Presentacion() {
  return (
    <div className="presentacion">
      <h1 className="titulo">Propagación de errores en operaciones básicas</h1>
      <h2 className="subtitulo">Conceptos claves</h2>

      <div className="cards-grid">
        {/* Card 1 */}
        <div className="card">
          <h3>Función u = f(x)</h3>
          <p>
            Una función <em>u</em> depende de variables <em>x₁, x₂, …, xₙ</em> que
            poseen errores asociados.
          </p>
          <BlockMath math={'u = f(x_1, x_2, ..., x_n)'} />
        </div>

        {/* Card 2 */}
        <div className="card">
          <h3>Errores absolutos de las variables</h3>
          <p>
            Cada variable <em>xᵢ</em> posee un error absoluto asociado, denotado como:
          </p>
          <BlockMath math={'\\Delta x_i'} />
        </div>

        {/* Card 3 */}
        <div className="card">
          <h3>Cota de error absoluto</h3>
          <p>
            La cota superior del error absoluto de una función <em>u</em> se define como:
          </p>
          <BlockMath math={'\\Delta^*(u) = \\sum_{i=1}^{n} \\left| \\frac{\\partial u}{\\partial x_i} \\right| \\cdot \\Delta^*(x_i)'} />
        </div>

        {/* Card 4 */}
        <div className="card">
          <h3>Cota de error relativo</h3>
          <p>
            La cota superior del error relativo de una función <em>u</em> se define como:
          </p>
          <BlockMath math={'\\varepsilon^*(u) = \\frac{\\Delta^*(u)}{|u|}'} />
        </div>
      </div>
    </div>
  )
}

export default Presentacion