export interface Empleado {
  id?: number
  nombre: string
  apellido_paterno: string
  apellido_materno: string
  email: string
  telefono: string
  id_puesto: number
  fecha_contratacion?: string
}

const API_URL = "http://localhost:3000/empleados"


export const obtenerEmpleados = async (): Promise<Empleado[]> => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error("Error al obtener los empleados")
    }
    return await response.json()
  } catch (error) {
    console.error("Error al obtener los empleados", error)
    throw error
  }
}

export const obtenerEmpleadoPorId = async (id: number): Promise<Empleado> => {
  try {
    const response = await fetch(`${API_URL}/${id}`)
    if (!response.ok) {
      throw new Error("Error al obtener el empleado")
    }
    return await response.json()
  } catch (error) {
    console.error("Error al obtener el empleado", error)
    throw error
  }
}


export const crearEmpleado = async (empleado: Empleado): Promise<Empleado> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empleado),
    })
    if (!response.ok) {
      throw new Error("Error al crear el empleado")
    }
    return await response.json()
  } catch (error) {
    console.error("Error al crear el empleado", error)
    throw error
  }
}


export const actualizarEmpleado = async (id: number, empleado: Empleado): Promise<Empleado> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empleado),
    })
    if (!response.ok) {
      throw new Error("Error al actualizar el empleado")
    }
    return await response.json()
  } catch (error) {
    console.error("Error al actualizar el empleado", error)
    throw error
  }
}


export const eliminarEmpleado = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Error al eliminar el empleado")
    }
    return response.status === 204
  } catch (error) {
    console.error("Error al eliminar el empleado", error)
    throw error
  }
}
