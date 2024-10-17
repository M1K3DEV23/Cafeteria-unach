import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AddProductPage from './pages/AddProductPage'
import CategoriesPage from './pages/CategoriesPage'
import CreateCategory from './pages/CreateCategory'
import ProductPage from './pages/ProductsPage'
import ProductsCrudPage from './pages/ProductsCrudPage'
import CreatePuesto from './pages/CreatePuesto'
import Navigation from './pages/Navigation'
import PuestoPage from './pages/PuestoPage'
import CreateEmpleado from './pages/CreateEmpleado'
import TablaEmpleados from './pages/TablaEmpleados'
// import PuestoPage from './pages/PuestoPage'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigation />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/create-product" element={<AddProductPage />} />
          <Route path="/products_admin" element={<ProductsCrudPage />} />
          <Route path="/puestos" element={<PuestoPage />} />
          <Route path="/create-empleado" element={<CreateEmpleado />} />
          <Route path="/empleados" element={<TablaEmpleados />} />

          <Route path="/create-puesto" element={<CreatePuesto />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
