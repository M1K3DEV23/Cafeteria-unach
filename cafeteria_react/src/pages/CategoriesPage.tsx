import React, { useEffect, useState } from "react";
import { fetchCategories, updateCategory as updateCategoryService, deleteCategory, Category } from '../services/categoryService'
import Header from "../components/Header";

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);

  // Manejar la actualizacion
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false)


  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data)
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    getCategories()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id)
      setCategories(categories.filter(cat => cat.id !== id))
    } catch (error) {
      setError((error as Error).message)
    }
  }


  const handleUpdate = async (updateCategory: Category) => {
    try {
      await updateCategoryService(updateCategory.id, updateCategory)
      setCategories(categories.map(cat => (cat.id === updateCategory.id ? updateCategory : cat)))
      setIsDialogOpen(false)
      setSelectedCategory(null)
    } catch (error) {
      console.error('Error updating categoty: ', error)
    }
  }


  // Abrir el dialog
  const openDialog = (category: Category) => {
    setSelectedCategory(category)
    setIsDialogOpen(true)
  }

  // Cerrar el dialog
  const closeDialog = () => {
    setIsDialogOpen(false)
    setSelectedCategory(null)
  }

  // Para submit el update del dialog
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (selectedCategory) {
      const formData = new FormData(event.currentTarget)
      const updatedCategory = {
        id: selectedCategory.id,
        nombre: formData.get('nombre') as string,
        descripcion: formData.get('descripcion') as string,
      }

      handleUpdate(updatedCategory)
    }
  }

  if (loading) return <p className="text-center">Cargando...</p>
  if (error) return <p className="text-red-500 text-center'">{error}</p>

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Categorías</h1>
        <div className="grid grid-cols1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => (
            <div key={category.id} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-2">{category.nombre}</h2>
              <p className="text-gray-700 mb-4">{category.descripcion}</p>
              <div className="flex justify-end space-x-4">
                <button onClick={() => openDialog(category)} className="text-blue-500 hover:text-blue-600 focus:outline-none">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-600 focus:outline-none">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {isDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <dialog open={isDialogOpen} onClose={closeDialog} className=" relative bg-white rounded-lg shadow-lg p-6 w-full sm:w-11/12 md:w-3/4 lg:1/2 xl:w-1/3">
              {/* Boton para cerrar en la esquina superior derecha */}
              <button
                onClick={closeDialog}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="text-2xl font-bold mb-4">Actualizar Categoría</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">Nombre</label>
                  <input type="text" name="nombre" id="nombre" defaultValue={selectedCategory?.nombre || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="descripcion" className="block text-gray-700 font-bold mb-2">Descripción</label>
                  <textarea name="descripcion" id="descripcion" defaultValue={selectedCategory?.descripcion || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" rows={4}></textarea>
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Actualizar Categoría
                  </button>
                </div>
              </form>
            </dialog>
          </div>
        )}
      </div>
    </div>
  )
}


export default CategoriesPage