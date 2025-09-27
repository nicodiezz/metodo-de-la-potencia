import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Presentacion from './pages/Presentacion'
import Teoria from './pages/Teoria'
import Practica from './pages/Practica'
import Cierre from './pages/Cierre'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Presentacion />} />
          <Route path="/teoria" element={<Teoria />} />
          <Route path="/practica" element={<Practica />} />
          <Route path="/cierre" element={<Cierre />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App