import React, { useEffect, useState } from "react";
import { Empleado, obtenerEmpleados, actualizarEmpleado, eliminarEmpleado } from "../services/empleadoService";
import { getPuestos } from "../services/puestoService";
import DialogEmpleado from "../components/DialogEmpleado";
import { toast } from "react-toastify";
import Header from "../components/Header";

const TablaEmpleados: React.FC = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [puestos, setPuestos] = useState<{ id: number, nombre_puesto: string }[]>([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Cargar empleados al montar el componente
  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await obtenerEmpleados();
        setEmpleados(response);
      } catch (error) {
        console.error("Error al obtener los empleados:", error);
      }
    };

    const fetchPuestos = async () => {
      try {
        const response = await getPuestos();
        setPuestos(response);
      } catch (error) {
        console.error("Error al obtener los puestos:", error);
      }
    }

    fetchEmpleados();
    fetchPuestos();
  }, []);



  const handleEditClick = (empleado: Empleado) => {
    setSelectedEmpleado(empleado);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedEmpleado(null);
  };

  // Manejar el guardado de los cambios
  const handleSave = async (updatedEmpleado: Empleado) => {
    if (updatedEmpleado.id) {
      await actualizarEmpleado(updatedEmpleado.id, updatedEmpleado);
      // Actualiza la lista de empleados localmente
      setEmpleados((prevEmpleados) =>
        prevEmpleados.map((emp) =>
          emp.id === updatedEmpleado.id ? updatedEmpleado : emp
        )
      );
    }
    setIsDialogOpen(false);
  };

  const handleDeleteClick = async (id: number | undefined) => {
    if (id !== undefined) {
      try {
        await eliminarEmpleado(id);
        setEmpleados((prevEmpleados) => prevEmpleados.filter((emp) => emp.id !== id));
        toast.success("¡Empleado eliminado exitosamente!");
      } catch (error) {
        toast.error("Error al eliminar el empleado");
      }
    } else {
      toast.error("ID de empleado no encontrado");
    }
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Tabla de Empleados</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Nombre</th>
                <th className="py-3 px-4 text-left">Apellido Paterno</th>
                <th className="py-3 px-4 text-left">Apellido Materno</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Teléfono</th>
                <th className="py-3 px-4 text-left">Puesto</th>
                <th className="py-3 px-4 text-left">Fecha de Contratación</th>
                <th className="py-3 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((empleado) => (
                <tr
                  key={empleado.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-4">{empleado.nombre}</td>
                  <td className="py-3 px-4">{empleado.apellido_paterno}</td>
                  <td className="py-3 px-4">{empleado.apellido_materno}</td>
                  <td className="py-3 px-4">{empleado.email}</td>
                  <td className="py-3 px-4">{empleado.telefono}</td>
                  <td className="py-3 px-4">
                    {puestos.find(puesto => puesto.id === empleado.id_puesto)?.nombre_puesto || 'Puesto no encontrado'}
                  </td>
                  <td className="py-3 px-4">{empleado.fecha_contratacion}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditClick(empleado)}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(empleado.id)}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isDialogOpen && selectedEmpleado && (
          <DialogEmpleado
            empleado={selectedEmpleado}
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default TablaEmpleados;
