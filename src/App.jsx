import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Presentacion from './pages/Presentacion'
import Producto from './pages/Producto'
import Cociente from './pages/Cociente'
import Practica from './pages/Practica'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Presentacion />} />
          <Route path="/producto" element={<Producto />} />
          <Route path="/cociente" element={<Cociente />} />
          <Route path="/practica" element={<Practica />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App