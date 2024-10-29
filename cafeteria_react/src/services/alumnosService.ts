const API_URL = 'http://localhost:3000/alumnos';


export interface AlumnoInterface {
  matricula: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  grupo: string;
  carrera: string;
}



export const getAlumnos = async (): Promise<AlumnoInterface[]> => {

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener los alumnos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener los alumnos', error);
    throw error;
  }
}

