import React, { useEffect, useState } from 'react';
import { Product, updateProduct, Category, fetchCategories } from '../services/productService';

interface EditProductDialogProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onProductUpdated: (updatedProduct: Product) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({ product, isOpen, onClose, onProductUpdated }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<Product>(product);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(product.imagen_url || null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    getCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({
        ...formData,
        imagen_url: url,
      });
      setPreview(url);
      setImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({
        ...formData,
        imagen_url: url,
      });
      setPreview(url);
      setImageFile(file);
    }
  };

  const handleRemove = () => {
    setFormData({
      ...formData,
      imagen_url: null,
    });
    setPreview(null);
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('nombre', formData.nombre);
      formDataWithImage.append('descripcion', formData.descripcion);
      formDataWithImage.append('precio', formData.precio.toString());
      formDataWithImage.append('cantidad_en_inventario', formData.cantidad_en_inventario.toString());
      formDataWithImage.append('categoria_id', formData.categoria_id.toString());

      if (imageFile) {
        formDataWithImage.append('imagen', imageFile);
      }

      const updatedProduct = await updateProduct(product.id!, formDataWithImage);
      onProductUpdated(updatedProduct);
      onClose();
    } catch (err) {
      setError('Error al actualizar el producto');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <dialog open className="relative bg-white rounded-lg shadow-lg p-6 w-full sm:w-11/12 md:w-3/4 lg:1/2 xl:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-gray-700 font-bold mb-2">Descripción</label>
            <textarea
              name="descripcion"
              id="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={4}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="precio" className="block text-gray-700 font-bold mb-2">Precio</label>
            <input
              type="number"
              name="precio"
              id="precio"
              value={formData.precio}
              onChange={handleChange}
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cantidad_en_inventario" className="block text-gray-700 font-bold mb-2">Cantidad en Inventario</label>
            <input
              type="number"
              name="cantidad_en_inventario"
              id="cantidad_en_inventario"
              value={formData.cantidad_en_inventario}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categoria_id" className="block text-gray-700 font-bold mb-2">Categoría</label>
            <select
              name="categoria_id"
              id="categoria_id"
              value={formData.categoria_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="imagen" className="block text-gray-700 font-bold mb-2">Imagen</label>
            <div
              id="drop-zone"
              className="border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:border-gray-400"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => document.getElementById('imagen')?.click()}
            >
              <p>Arrastra y suelta una imagen aquí o haz clic para seleccionar una</p>
              <input
                type="file"
                name="imagen"
                id="imagen"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            {preview && (
              <div className="relative mt-4 w-1/2 mx-auto max-w-xs">
                <img
                  src={`http://localhost:3000/${preview}`}
                  className="w-full h-auto rounded-md"
                  alt="Previsualización de la imagen"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                  onClick={handleRemove}
                >
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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default EditProductDialog;