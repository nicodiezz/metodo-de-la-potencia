import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/propagacion-errores-style.css';
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

export default function ProductoErrores() {
  const navigate = useNavigate();

  return (
    <div className='page-container'>
      <div className="header-text">
      <h2>Propagación de Errores en Operaciones Básicas: Producto</h2>
      <h3>Enfoque teórico</h3>
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
      </div>
    </div>
  );
}
