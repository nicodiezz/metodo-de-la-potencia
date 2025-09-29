import { useState } from "react";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import { Container, Row, Col, Card, Button, ProgressBar, Alert } from "react-bootstrap";

export default function Teoria() {
  const [currentStep, setCurrentStep] = useState(0);
  
  /*const customStyles = {
    '--color-primary': '#340ea5',
    '--color-secondary': '#5026bc', 
    '--color-tertiary': '#6c3ed2',
    '--color-accent': '#8755e9',
    '--color-text': '#ffffff',
    '--color-background': '#f9f9f9'
  };*/
  
  const steps = [
    {
      title: "¿Qué es el Método de la Potencia?",
      content: (
        <div>
          <p className="fs-5 mb-4">
            El <strong>método de la potencia</strong> es un algoritmo iterativo que nos permite encontrar 
            el <em>autovalor dominante</em> (el más grande en valor absoluto) y su correspondiente 
            <em>autovector</em> de una matriz.
          </p>
          <Alert variant="info" className="border-start border-4" 
                 style={{borderLeftColor: 'var(--color-accent)', backgroundColor: '#e8f4fd'}}>
            <Alert.Heading className="h6" style={{color: 'var(--color-secondary)'}}>
              💡 Intuición clave:
            </Alert.Heading>
            <p className="mb-0" style={{color: 'var(--color-primary)'}}>
              Imagina que tienes una transformación lineal. Si aplicas esta transformación 
              repetidamente a un vector, éste tenderá a alinearse con la "dirección de mayor 
              crecimiento" de la matriz.
            </p>
          </Alert>
        </div>
      )
    },
    {
      title: "Paso 1: Vector inicial",
      content: (
        <div>
          <p className="mb-4">Comenzamos con un vector inicial <InlineMath math="v_0" /> aleatorio (pero no el vector cero).</p>
          <BlockMath math="y_0 = \begin{bmatrix} y_{01} \\ y_{02} \\ \vdots \\ y_{0n} \end{bmatrix}" />
          <Alert variant="success" className="mt-4" 
                 style={{backgroundColor: '#e8f6e8', borderColor: 'var(--color-accent)'}}>
            <Alert.Heading className="h6" style={{color: '#2d5a2d'}}>
              🎯 ¿Por qué funciona?
            </Alert.Heading>
            <p className="mb-0" style={{color: '#2d5a2d'}}>
              Cualquier vector se puede expresar como combinación lineal de los autovectores. 
              El componente asociado al autovalor dominante crecerá más rápido que los demás.
            </p>
          </Alert>
        </div>
      )
    },
    {
      title: "Paso 2: Multiplicación iterativa",
      content: (
        <div>
          <p className="mb-4">En cada iteración <InlineMath math="k" />, multiplicamos el vector por la matriz <InlineMath math="A" />:</p>
          <BlockMath math="y_k = A \cdot v_{k-1}" />
          <p className="my-4">Luego normalizamos para evitar que los números crezcan descontroladamente:</p>
          <BlockMath math="v_k = \frac{y_k}{\|y_k\|}" />
          <Alert variant="warning" className="mt-4"
                 style={{backgroundColor: '#fff8e1', borderColor: 'var(--color-tertiary)'}}>
            <Alert.Heading className="h6" style={{color: '#8a6914'}}>
              ⚡ Lo que está pasando:
            </Alert.Heading>
            <p className="mb-0" style={{color: '#8a6914'}}>
              Cada multiplicación "amplifica" la componente del autovector dominante más que las otras. 
              Es como si la matriz "empujara" al vector hacia su dirección preferida.
            </p>
          </Alert>
        </div>
      )
    },
    {
      title: "Paso 3: Convergencia",
      content: (
        <div>
          <p className="mb-4">Después de muchas iteraciones, el vector converge hacia el autovector dominante:</p>
          <BlockMath math="v_k \to v_{\text{dominante}} \text{ cuando } k \to \infty" />
          <p className="my-4">Y el autovalor se puede estimar por medio del Cociente de Rayleigh:</p>
          <BlockMath math="\lambda_k \approx \frac{y^{T} A y}{y^{T} y}" />
          <Alert variant="primary" className="mt-4"
                 style={{backgroundColor: '#e3f2fd', borderColor: 'var(--color-primary)'}}>
            <Alert.Heading className="h6" style={{color: 'var(--color-primary)'}}>
              🔍 Criterio de parada:
            </Alert.Heading>
            <p className="mb-0" style={{color: 'var(--color-primary)'}}>
              Paramos cuando la diferencia entre vectores consecutivos es muy pequeña, 
              o cuando el autovalor estimado se estabiliza.
            </p>
          </Alert>
        </div>
      )
    },
    {
      title: "Algoritmo Completo",
      content: (
        <div>
          <Card className="mb-4" style={{backgroundColor: 'var(--color-background)'}}>
            <Card.Body>
              <Card.Title style={{color: 'var(--color-primary)'}}>
                Algoritmo del Método de la Potencia:
              </Card.Title>
              <div className="font-monospace" style={{fontSize: '0.9rem', color: 'var(--color-secondary)'}}>
                <div className="mb-2">1. Elegir vector inicial v₀ ≠ 0</div>
                <div className="mb-2">2. Para k = 1, 2, 3, ...</div>
                <div className="ms-4 mb-1">a. yₖ = A · vₖ₋₁</div>
                <div className="ms-4 mb-1">b. vₖ = yₖ / ||yₖ||</div>
                <div className="ms-4 mb-2">c. λₖ = (y^T * Ay) / (y^T * y) </div>
                <div>3. Repetir hasta convergencia</div>
              </div>
            </Card.Body>
          </Card>
          <BlockMath math="\lim_{k \to \infty} v_k = \text{autovector dominante}" />
          <BlockMath math="\lim_{k \to \infty} \lambda_k = \text{autovalor dominante}" />
        </div>
      )
    }
  ];

  const handleStepChange = (newStep) => {
    setCurrentStep(Math.max(0, Math.min(steps.length - 1, newStep)));
  };

  return (
    <div>
      <Container fluid className="py-4" style={{backgroundColor: 'var(--color-background)', minHeight: '100vh'}}>
        <Container>
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold mb-3" style={{color: 'var(--color-primary)'}}>
              Teoría - Método de la Potencia
            </h1>
          </div>

          {/* Current step content */}
          <Card className="shadow-lg mb-4" style={{minHeight: '500px'}}>
            <Card.Header style={{backgroundColor: 'var(--color-primary)', color: 'var(--color-text)'}}>
              <h2 className="h3 mb-0">
                {steps[currentStep].title}
              </h2>
            </Card.Header>
            <Card.Body className="p-4">
              <div style={{color: 'var(--color-primary)', lineHeight: '1.6'}}>
                {steps[currentStep].content}
              </div>
            </Card.Body>
          </Card>

          {/* Navigation buttons */}
          <div className="d-flex justify-content-between mb-4">
            <Button
              variant="secondary"
              onClick={() => handleStepChange(currentStep - 1)}
              disabled={currentStep === 0}
              style={{backgroundColor: 'var(--color-secondary)', borderColor: 'var(--color-secondary)'}}
            >
              ← Anterior
            </Button>
            <Button
              variant="primary"
              onClick={() => handleStepChange(currentStep + 1)}
              disabled={currentStep === steps.length - 1}
              style={{backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)'}}
            >
              Siguiente →
            </Button>
          </div>

         
          {/* Quick navigation */}
          <Card>
            <Card.Header style={{backgroundColor: 'var(--color-background)'}}>
              <h3 className="h5 mb-0" style={{color: 'var(--color-secondary)'}}>
                Navegación rápida:
              </h3>
            </Card.Header>
            <Card.Body>
              <Row>
                {steps.map((step, index) => (
                  <Col key={index} xs={12} md={6} lg={4} className="mb-2">
                    <Button
                      variant={index === currentStep ? "primary" : "outline-secondary"}
                      size="sm"
                      onClick={() => handleStepChange(index)}
                      className="w-100 text-start"
                      style={index === currentStep ? {
                        backgroundColor: 'var(--color-accent)',
                        borderColor: 'var(--color-accent)',
                        color: 'var(--color-text)'
                      } : {}}
                    >
                      {index + 1}. {step.title}
                    </Button>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </Container>
    </div>
  );
}
