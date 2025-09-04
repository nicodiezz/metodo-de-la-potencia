import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";


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
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < steps.length) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <>
      <h1>Propagación de los errores en operaciones básicas: Cociente</h1>
      <div
        className="min-h-screen flex flex-col justify-center items-center p-6"
        style={{
          background: "linear-gradient(90deg, #8655e9c5, #a26dff5b)",
          color: "white",
          fontFamily: "Arial, sans-serif",
          fontSize: "24px",
          cursor: "pointer",
        }}
        onClick={(e) => {
          const { clientX, currentTarget } = e;
          if (clientX > currentTarget.clientWidth / 2) {
            nextStep();
          }
          else {
            prevStep();
          }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl shadow-xl p-8 max-w-3xl w-full"
            style={{
              color: "#000000ff",
              height: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div className="flex flex-col items-center gap-6">
              <BlockMath math={steps[step - 1].top} className="a"/>
              {steps[step - 1].bottom && <BlockMath math={steps[step - 1].bottom} />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
