import React from "react";
import { Product } from '../services/productService';

interface ProductCardProps {
  product: Product;
  onEdit?: (productId: number) => void;
  onDelete?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  // Construir la URL completa para la imagen
  const BASE_API_URL = "http://localhost:3000";

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={`${BASE_API_URL}/${product.imagen_url}`}
        alt={product.nombre}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{product.nombre}</h2>
        <p className="text-gray-600 mb-4">{product.categoria_nombre}</p>
        <p className="text-gray-700 mb-4">{product.descripcion}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-blue-500">${product.precio}</p>
          <p className={`text-sm font-semibold ${product.cantidad_en_inventario ? 'text-green-500' : 'text-red-500'}`}>
            {product.cantidad_en_inventario ? 'En Stock' : 'Agotado'}
          </p>
        </div>
        {/* Mostrar botones de editar/eliminar solo si se pasan las funciones */}
        {(onEdit || onDelete) && (
          <div className="flex justify-end mt-4 space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(product.id ?? 0)}
                className="text-sm text-white bg-blue-500 hover:bg-blue-700 py-1 px-3 rounded"
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(product.id ?? 0)}
                className="text-sm text-white bg-red-500 hover:bg-red-700 py-1 px-3 rounded"
              >
                Eliminar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;