import React, { useState } from "react";
import Header from "../components/Header";

// LLamada a la API
import { crearPuesto } from "../services/puestoService"
import { toast, ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/ReactToastify.min.css'


const CreatePuesto: React.FC = () => {

  const [nombrePuesto, setNombrePuesto] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Validacion para evitar el envio de campo vacio
    if (!nombrePuesto.trim()) {
      toast.warn("El nombre del puesto no puede estar vacio.")
      return;
    }

    try {
      const response = await crearPuesto(nombrePuesto)

      if (response.ok) {
        toast.success("!Puesto creado exitosamente!")
        setNombrePuesto('')
      } else {
        toast.error("Hubo un error al crear el puesto")
        // console.error("Hubo un error al crear el puesto")
      }
    } catch (error) {
      console.error("Error: ", error)
      toast.error("Error de conexion con el servidor")
    }
  }

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bol text-center mb-8">
          Crear Puesto
        </h1>
        <form className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre_puesto" className="block text-gray-700 font-bold mb-2">
              Nombre del puesto
            </label>
            <input type="text" id="nombre_puesto" name="nombre_puesto" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" value={nombrePuesto} onChange={(e) => setNombrePuesto(e.target.value)} placeholder="Escribe el nombre del puesto" />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Crear Puesto</button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} pauseOnFocusLoss={false} transition={Zoom}></ToastContainer>
    </div>
  )
}


export default CreatePuesto