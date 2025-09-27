import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

export default function Integrante1() {
  return (
    <div className="page-container">
      {/* Encabezado */}
      <div className="header-text">
        <h1>Autovalores y Autovectores + conexión con el Método de la Potencia</h1>
      </div>

      {/* Definición clara */}
      <div className="math-container">
        <h3>¿Qué son autovalores y autovectores?</h3>
        <p>
          Sea <InlineMath math={"A"}/> una matriz cuadrada de orden n. Un número
          <InlineMath math={"\\lambda"}/> es un <strong>autovalor</strong> de
          <InlineMath math={"A"}/> si existe un vector no nulo <InlineMath math={"x"}/> tal que:
        </p>
        <BlockMath math={"A x = \\lambda x, \\quad x \\neq 0"} />
        <p>
          En ese caso, el vector <InlineMath math={"x"}/> se llama
          <strong> autovector</strong> asociado al autovalor <InlineMath math={"\\lambda"}/>.
        </p>
        <p>
          Equivalentemente, los autovalores se obtienen resolviendo la ecuación
          característica:
        </p>
        <BlockMath math={"\\det(A - \\lambda I) = 0"} />
      </div>

      {/* Intuición gráfica */}
      <div className="math-container">
        <h3>Una intuición en 1 frase</h3>
        <p>
          Un autovector es una <strong>dirección invariante</strong>: la matriz
          <InlineMath math={"A"}/> no cambia su orientación, solo la multiplica por un factor
          <InlineMath math={"\\lambda"}/> que indica cuánto se estira o encoge.
        </p>
        <h4>Ejemplo intuitivo</h4>
        <p>
          Si <InlineMath math={"A = \\begin{bmatrix} 2 & 0 \\ \\ 0 & 1/2 \\end{bmatrix}"}/> entonces:
          <br/> <InlineMath math={"e_1 = (1,0)^T"}/> es autovector con
          <InlineMath math={"\\lambda_1=2"}/> (se duplica su longitud).<br/>
          <InlineMath math={"e_2 = (0,1)^T"}/> es autovector con
          <InlineMath math={"\\lambda_2=1/2"}/> (se reduce a la mitad).
        </p>
      </div>

      {/* Conexión con clase de hoy */}
      <div className="math-container">
        <h3>Conexión con el tema de hoy</h3>
        <p>
          El <strong>Método de la Potencia</strong> es un procedimiento iterativo para calcular
          el <em>autovalor dominante</em> (el de mayor módulo) y su autovector asociado.
        </p>
        <BlockMath math={"y_{k+1} = A y_k, \\quad x_k = \\frac{y_k}{\\|y_k\\|}, \\quad \\hat{\\lambda}_k = \\frac{x_k^T A x_k}{x_k^T x_k}"} />
        <ul>
          <li>Consiste en multiplicar repetidamente por <InlineMath math={"A"}/> y normalizar.</li>
          <li>Si <InlineMath math={"|\\lambda_1| > |\\lambda_2| \\ge \\cdots"}/> y el vector inicial tiene componente en la dirección de <InlineMath math={"x_1"}/>, entonces <InlineMath math={"x_k"}/> converge al autovector dominante.</li>
          <li>Limitación: solo encuentra el autovalor de mayor módulo. Para otros, se usan variantes como potencia inversa o deflación.</li>
        </ul>
      </div>


      {/* Cierre */}
      <div className="math-container" style={{textAlign:"center"}}>
        <p><em>Idea clave:</em> un autovector es una dirección invariante y el método de la potencia encuentra el correspondiente al autovalor más grande en módulo.</p>
      </div>
    </div>
  );
}