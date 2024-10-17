import React, { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { addProduct } from '../services/productService'
import { fetchCategories, Category } from '../services/categoryService'
import styles from './AddProductPage.module.css' // Importa el modulo CSS
import Header from "../components/Header";





const AddProductPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidad_en_inventario: 0,
    categoria_id: 0
  })
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('')
  const [categories, setCategories] = useState<Category[]>([]);


  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories', error)
      }
    }
    getCategories()
  }, [])


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Actualizar el estado con el archivo
      setImageFile(file);

      // Crear una instancia de FileReader para leer el archivo
      const reader = new FileReader();

      // Establecer el evento onloadend para actualizar la vista previa
      reader.onloadend = () => {
        // Actualizar el estado de la vista previa con la URL del archivo
        setPreview(reader.result as string);
      };

      // Leer el archivo como URL de datos
      reader.readAsDataURL(file);
    } else {
      // Limpiar la vista previa y el archivo si no se selecciona ninguno
      setImageFile(null);
      setPreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null);
    setImageFile(null)
  }

  const handleChage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Crear un FormData para manejar la imagen y los datos del producto
      const formDataWithImage = new FormData()

      formDataWithImage.append('nombre', formData.nombre);
      formDataWithImage.append('descripcion', formData.descripcion);
      formDataWithImage.append('precio', formData.precio.toString());
      formDataWithImage.append('cantidad_en_inventario', formData.cantidad_en_inventario.toString());
      formDataWithImage.append('categoria_id', formData.categoria_id.toString());

      if (imageFile) {
        formDataWithImage.append('imagen', imageFile)
      }
      await addProduct(formDataWithImage);
      setFormData({
        nombre: '',
        descripcion: '',
        precio: 0.00,
        cantidad_en_inventario: 0,
        categoria_id: 0,
      });
      setPreview(null);
      setImageFile(null);
      setError(null);
      alert('Producto agregado exitosamente!');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <Header />
      {/* CONTENIDO */}
      <div className="container mx-auto p-4">
        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center mb-8">Agregar Producto</h1>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">Nombre</label>
            <input type="text" name="nombre" id="nombre" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" value={formData.nombre} onChange={handleChage} required />
          </div>
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-gray-700 font-bold mb-2">Descripción</label>
            <textarea name="descripcion" id="descripcion" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" rows={4} value={formData.descripcion} onChange={handleChage}></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="precio" className="block text-gray-700 font-bold mb-2">Precio</label>
            <input type="number" name="precio" id="precio" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" value={formData.precio} onChange={handleChage} step='0.01' required />
          </div>
          <div className="mb-4">
            <label htmlFor="cantidad_en_inventario" className="block text-gray-700 font-bold mb-2">Cantidad en Inventario</label>
            <input type="number" name="cantidad_en_inventario" id="cantidad_en_inventario" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" value={formData.cantidad_en_inventario} onChange={handleChage} required />
          </div>
          <div className="mb-4">
            <label htmlFor="categoria_id" className="block text-gray-700 font-bold mb-2">Categoría</label>
            <select name="categoria_id" id="categoria_id" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" value={formData.categoria_id} onChange={handleChage} required>
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="imagen" className="block text-gray-700 font-bold mb-2">Imagen</label>
            <div id="drop-zone" className={`${styles.dropZone}`} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} onClick={() => document.getElementById('imagen')?.click()}>
              <p>Arrastra y suelta una imagen aquí o haz clic para seleccionar una</p>
              <input type="file" name="imagen" id="imagen" className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
            {preview && (
              <div className="relative mt-4 w-1/2 mx-auto max-w-sx">
                <img src={preview as string} className="w-full h-auto max-w-xs rounded-md" alt="Previsualización de la imagen" />
                <button type="button" className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none" onClick={handleRemoveImage}>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Agregar Producto</button>
          </div>
        </form>
      </div>

    </div>
  )
}


export default AddProductPage