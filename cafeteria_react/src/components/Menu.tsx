import React, { useState } from "react";
import { Link } from 'react-router-dom'

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className="md:hidden">
        <button id="menu-toggle" onClick={toggleMenu} className="text-gray-700 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <div id="menu" className={`fixed top-0 right-0 h-full w-64 bg-white shadow-md z-50 ${isOpen ? 'open' : ''}`} style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s ease-in-out' }}>
        <div className="flex justify-end p-4">
          <button id="menu-close" onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav className="px-4 py-2 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-blue-500">Menu</Link>
          <Link to="/products" className="block text-gray-700 hover:text-blue-500">Ver Productos</Link>
          {/* <Link to="/categories" className="block text-gray-700 hover:text-blue-500">Categorias</Link>
          <Link to="/create-category" className="block text-gray-700 hover:text-blue-500">Crear Categoría</Link>
          <Link to="/add-product" className="block text-gray-700 hover:text-blue-500">Anadir Productos</Link>
          <Link to="/products_admin" className="block text-gray-700 hover:text-blue-500">Administrar Productos</Link>
          <Link to="/create-puesto" className="block text-gray-700 hover:text-blue-500">Crear puesto</Link>
          <Link to="/users" className="block text-gray-700 hover:text-blue-500">Administrar Empleados</Link> */}
        </nav>
      </div>
    </>
  )
}

export default Menu;