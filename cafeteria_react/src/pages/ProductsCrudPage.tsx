import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Product, fetchProductsWithCategories, deleteProduct } from '../services/productService';
import EditProductDialog from "../components/Dialog";
import Header from "../components/Header";

const ProductsCrudPage: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductsWithCategories();
        setProducts(data)
      } catch (err) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  // Editar
  const handleEdit = (productId: number) => {
    const productToEdit = products.find(p => p.id === productId);
    if (productToEdit) {
      setSelectedProduct(productToEdit);
      setIsEditDialogOpen(true);
    }
  }

  // Borrar
  const handleDelete = async (productId: number) => {
    await deleteProduct(productId)
    setProducts(products.filter(product => product.id !== productId))
  }


  const handleProductUpdated = (updatedProduct: Product) => {
    setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)))
  }



  if (loading) return <p className="text-center">Cargando productos...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Panel de Productos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          {selectedProduct && (
            <EditProductDialog product={selectedProduct} isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} onProductUpdated={handleProductUpdated} />
          )}
        </div>
      </div>

    </div>
  );
};

export default ProductsCrudPage;
