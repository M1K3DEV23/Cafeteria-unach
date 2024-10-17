import React from "react";
import { Link } from 'react-router-dom'

const NavBar: React.FC = () => {
  return (
    <nav className="hidden md:flex space-x-4">
      {/* <Link to="/" className="block text-gray-700 hover:text-blue-500">Menu</Link>
      <Link to="/categories" className="block text-gray-700 hover:text-blue-500">Categorias</Link>
      <Link to="/create-category" className="block text-gray-700 hover:text-blue-500">Crear Categoría</Link>
      <Link to="/create-product" className="block text-gray-700 hover:text-blue-500">Anadir Productos</Link>
      <Link to="/products_admin" className="block text-gray-700 hover:text-blue-500">Administrar Productos</Link>
      <Link to="/users" className="block text-gray-700 hover:text-blue-500">Administrar Empleados</Link>
      <Link to="/create-puesto" className="block text-gray-700 hover:text-blue-500">Crear puesto</Link> */}
      <Link to='/' className="block text-gray-700 hover:text-blue-500">Menu</Link>
      <Link to='/products' className="block text-gray-700 hover:text-blue-500">Productos</Link>
    </nav>
  )
}


export default NavBar