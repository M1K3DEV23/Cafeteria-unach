import React, { useState } from "react";
import { createCategory } from '../services/categoryService'
import Header from "../components/Header";
import { toast, ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/ReactToastify.min.css'

const CreateCategory: React.FC = () => {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validar que los campos no esten vacios
    if (nombre.trim() === '' || descripcion.trim() === "") {
      toast.warn("Todos los campos son obligatorios.")
      setLoading(false)
      return;
    }

    try {
      await createCategory(nombre, descripcion)
      toast.success("¡Categoría creada exitosamente!")
      setNombre('')
      setDescripcion('')
    } catch (error) {
      toast.error('Error al crear la categoría. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Crear Categoría</h1>
        <form className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6" onSubmit={handleSubmit}>
          <div className="mb-4">

            <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">Nombre</label>
            <input type="text" id="nombre" name="nombre" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Escribe un nombre" />
          </div>

          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-gray-700 font-bold mb-2">Descripción</label>
            <textarea id="descripcion" name="descripcion" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" rows={4} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Escribir una Descripción" ></textarea>
          </div>
          <div className="flex justify-center">
            <button type="submit" className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
              {loading ? 'Creando...' : 'Crear Categoría'}
            </button>
          </div>

        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} pauseOnFocusLoss={false} transition={Zoom} pauseOnHover={false}></ToastContainer>
    </div>
  )
}




export default CreateCategory