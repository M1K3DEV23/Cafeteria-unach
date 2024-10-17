
const API_URL = "http://localhost:3000"


// Actualizar puesto: PUT: http://localhost:3000/puestos/{id_puesto}
// Eliminar un puesto DELETE: http://localhost:3000/puestos/{id_puesto}


export interface Puesto {
  id: number
  nombre_puesto: string
}


/**
 * Obtener todos los puestos
 * @returns {Promise<Puesto[]>} - Arreglo de puestos
 */
export const getPuestos = async () => {
  try {
    const response = await fetch(`${API_URL}/puestos`, {
      method: "GET",
    })

    if (!response.ok) {
      throw new Error("Error al obtener los puestos")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error al obtener los puestos:", error)
    throw error
  }
}


/**
 * Crear un nuevo puesto
 * @param {string} nombrePuesto - Nombre del puesto a crear
 * @returns {Promise<Response>} - La respuesta del servidor
 */
export const crearPuesto = async (nombrePuesto: string): Promise<Response> => {
  const response = await fetch(`${API_URL}/puestos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre_puesto: nombrePuesto })
  })

  return response
}