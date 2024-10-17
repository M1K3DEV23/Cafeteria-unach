import React, { useState, useEffect } from "react";
import { getPuestos } from "../services/puestoService";
import { crearEmpleado, Empleado } from "../services/empleadoService"; // Asegúrate de que estas funciones estén importadas
import { toast, ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/ReactToastify.min.css';

const CreateEmpleado: React.FC = () => {
  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [idPuesto, setIdPuesto] = useState('');
  // const [fechaContratacion, setFechaContratacion] = useState('');
  const [puestos, setPuestos] = useState<{ id: number, nombre_puesto: string }[]>([]);

  useEffect(() => {
    const fetchPuestos = async () => {
      try {
        const puestosData = await getPuestos(); // Obtener los puestos
        setPuestos(puestosData);
      } catch (error) {
        console.error("Error al obtener los puestos:", error);
      }
    };

    fetchPuestos();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nuevoEmpleado: Empleado = {
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      email,
      telefono,
      id_puesto: parseInt(idPuesto),
    };

    try {
      await crearEmpleado(nuevoEmpleado);
      toast.success('¡Empleado creado exitosamente!');
      // Reiniciar los campos del formulario
      setNombre('');
      setApellidoPaterno('');
      setApellidoMaterno('');
      setEmail('');
      setTelefono('');
      setIdPuesto('');
      // setFechaContratacion('');
    } catch (error) {
      console.error('Error al crear el empleado:', error);
      toast.error('Error al crear el empleado');
    }

  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Crear Empleado</h1>
      <form className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">Nombre</label>
          <input type="text" id="nombre" className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="apellido_paterno" className="block text-gray-700 font-bold mb-2">Apellido Paterno</label>
          <input type="text" id="apellido_paterno" className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="apellido_materno" className="block text-gray-700 font-bold mb-2">Apellido Materno</label>
          <input type="text" id="apellido_materno" className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="telefono" className="block text-gray-700 font-bold mb-2">Teléfono</label>
          <input type="text" id="telefono" className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="id_puesto" className="block text-gray-700 font-bold mb-2">Puesto</label>
          <select id="id_puesto" className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={idPuesto} onChange={(e) => setIdPuesto(e.target.value)} required>
            <option value="">Selecciona un puesto</option>
            {puestos.map((puesto) => (
              <option key={puesto.id} value={puesto.id}>{puesto.nombre_puesto}</option>
            ))}
          </select>
        </div>
        {/* <div className="mb-4">
          <label htmlFor="fecha_contratacion" className="block text-gray-700 font-bold mb-2">Fecha de Contratación</label>
          <input type="date" id="fecha_contratacion" className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={fechaContratacion} onChange={(e) => setFechaContratacion(e.target.value)} required />
        </div> */}

        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">Crear Empleado</button>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={2000} pauseOnFocusLoss={false} transition={Zoom} />
    </div>
  );
};

export default CreateEmpleado;
