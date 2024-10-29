import React, { useEffect, useState } from "react";

import { getAlumnos, AlumnoInterface } from '../services/alumnosService'

import Header from "../components/Header";



const TablaAlumnos: React.FC = () => {

  const [alumnos, setAlumnos] = useState<AlumnoInterface[]>([]);

  const loadAlumnos = async () => {
    try {
      const data = await getAlumnos();
      setAlumnos(data);
    } catch (error) {
      console.error('Error al cargar los alumnos', error);
    }
  };

  useEffect(() => {
    loadAlumnos();
  }, []);


  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Tabla de alumnos</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Matricula</th>
                <th className="py-3 px-4 text-left">Nombre</th>
                <th className="py-3 px-4 text-left">Apellido Paterno</th>
                <th className="py-3 px-4 text-left">Apellido Materno</th>
                <th className="py-3 px-4 text-left">Grupo</th>
                <th className="py-3 px-4 text-left">Carrera</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno) => (
                <tr
                  key={alumno.matricula}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-4">{alumno.matricula}</td>
                  <td className="py-3 px-4 capitalize">{alumno.nombre}</td>
                  <td className="py-3 px-4 capitalize">{alumno.apellido_paterno}</td>
                  <td className="py-3 px-4 capitalize">{alumno.apellido_materno}</td>
                  <td className="py-3 px-4 capitalize">{alumno.grupo}</td>
                  <td className="py-3 px-4 ">{alumno.carrera}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}



export default TablaAlumnos;