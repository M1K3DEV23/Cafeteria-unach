const API_URL = 'http://localhost:3000/categorias'


export interface Category {
  id: number;
  nombre: string;
  descripcion: string;
}


// Obtener todas las categorias
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Error al obtener las categorias')
  }

  return response.json()
}

// Crear categorias
export const createCategory = async (nombre: string, descripcion: string): Promise<void> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombre, descripcion })
  })

  if (!response.ok) {
    throw new Error("Error al crear la categoría");

  }
}


// Para actualizar mis categorias
export const updateCategory = async (id: number, updateCategory: Category): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateCategory)
  })

  if (!response.ok) {
    throw new Error('Error al actualizar la categoria')
  }
}

// Eliminar la categoria
export const deleteCategory = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      const erroData = await response.json()
      throw new Error(`Error: ${erroData.error}`)
    }
  } catch (error) {
    console.error('Error al eliminar la categoria', error);
    throw error;
  }
}
