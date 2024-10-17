import React, { useEffect, useState } from "react";
import { fetchProductsWithCategories, Product } from '../services/productService'
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";


const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    loadProducts();
  }, []);

  if (loading) return <p className="text-center">Cargando productos...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Nuestros Productos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default ProductPage