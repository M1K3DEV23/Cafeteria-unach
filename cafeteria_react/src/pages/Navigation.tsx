import React from "react";
import { Link } from 'react-router-dom'

const Navigation: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      {/* HEADER */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Navegación de Enlaces
        </h1>
      </header>

      <nav>
        <ul className="space-y-4">
          <li><Link to="/categories" className="block p-3 bg-white shadow-md rounded-lg text-blue-600 hover:bg-blue-100 transition duration-300">Administrar Categorias</Link></li>
          <li><Link to="/create-category" className="block p-3 bg-white shadow-md rounded-lg text-blue-600 hover:bg-blue-100 transition duration-300">Crear Categorias</Link></li>
          {/* <li><Link to="/products" className="block p-3 bg-white shadow-md rounded-lg text-blue-600 hover:bg-blue-100 transition duration-300">Ver Productos</Link></li> */}
          <li><Link to="/products_admin" className="block p-3 bg-white shadow-md rounded-lg text-blue-600 hover:bg-blue-100 transition duration-300">Administrar Productos</Link></li>
          <li><Link to="/create-product" className="block p-3 bg-white shadow-md rounded-lg text-blue-600 hover:bg-blue-100 transition duration-300">Crear Productos</Link></li>
          <li><Link to="/puestos" className="block p-3 bg-white shadow-md rounded-lg text-blue-600 hover:bg-blue-100 transition duration-300">Administrar Puestos</Link></li>
          <li><Link to="/create-puesto" className="block p-3 bg-white shadow-md rounded-lg text-blue-600 hover:bg-blue-100 transition duration-300">Crear Puestos</Link></li>
          <li><Link to="/empleados" className="block p-3 bg-white shadow-md rounded-lg text-blue-600 hover:bg-blue-100 transition duration-300">Administrar Empleados</Link></li>
          <li><Link to="/create-empleado" className="block p-3 bg-white shadow-md rounded-lg text-blue-600 hover:bg-blue-100 transition duration-300">Crear Empleados</Link></li>
        </ul>
      </nav>
    </div>
  )
}


export default Navigation;