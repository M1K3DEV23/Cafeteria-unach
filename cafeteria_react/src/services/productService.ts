export interface Product {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad_en_inventario: number;
  categoria_id: number;
  categoria_nombre?: string;
  imagen_url?: string | null | undefined; // Campo para la imagen
}


export interface Category {
  id: number;
  nombre: string;
  descripcion: string;
}


const API_PRODUCTS_URL = 'http://localhost:3000/productos'
const API_CATEGORIES_URL = 'http://localhost:3000/categorias';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_PRODUCTS_URL)
  if (!response.ok) {
    throw new Error('Error fetching products')
  }
  const products = await response.json()
  return products
}

// Funcion para obtener todas las categorias
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(API_CATEGORIES_URL)
  if (!response.ok) {
    throw new Error('Error fetching categories')
  }

  const categories = await response.json()
  return categories
}

// Funcion para obtener productos con el nombre de la categoria incluida
export const fetchProductsWithCategories = async (): Promise<Product[]> => {
  const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()])

  // Combinar productos con categorias
  return products.map(product => {
    const category = categories.find(cat => cat.id === product.categoria_id)
    return {
      ...product,
      categoria_nombre: category ? category.nombre : 'Categoria desconocida'
    }
  })
}


// Agregar Productos
export const addProduct = async (formData: FormData): Promise<void> => {
  try {
    const response = await fetch(API_PRODUCTS_URL, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Error al agregar el producto: ${response.status} - ${response.statusText}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error al agregar el producto:', error)
    throw error;
  }
}


// Actualizar Productos
export const updateProduct = async (productId: number, formData: FormData): Promise<Product> => {
  try {
    const response = await fetch(`${API_PRODUCTS_URL}/${productId}`, {
      method: 'PUT',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Error al actualizar el producto: ${response.status} - ${response.statusText}`);
    }
    const result: Product = await response.json();
    return result;
  } catch (error) {
    console.log('Error al actualizar el producto:', error);
    throw error;
  }
}


// Eliminar Productos
export const deleteProduct = async (productId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_PRODUCTS_URL}/${productId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`Error al eliminar el producto: ${response.status} - ${response.statusText}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error al eliminar el Producto:', error)
    throw error;
  }
}