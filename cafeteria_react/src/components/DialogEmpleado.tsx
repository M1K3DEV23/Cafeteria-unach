import React, { useState, useEffect } from 'react';
import { Empleado } from '../services/empleadoService'; // Importar la interfaz
import { getPuestos } from '../services/puestoService';

interface EditEmpleadoDialogProps {
  empleado: Empleado | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedEmpleado: Empleado) => void;
}

const DialogEmpleado: React.FC<EditEmpleadoDialogProps> = ({ empleado, isOpen, onClose, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [idPuesto, setIdPuesto] = useState<number | undefined>(undefined);
  const [fechaContratacion, setFechaContratacion] = useState('');

  const [puestos, setPuestos] = useState<{ id: number, nombre_puesto: string }[]>([]);

  // Cargar los datos del empleado cuando el diálogo se abre
  useEffect(() => {
    if (empleado) {
      setNombre(empleado.nombre);
      setApellidoPaterno(empleado.apellido_paterno);
      setApellidoMaterno(empleado.apellido_materno);
      setEmail(empleado.email);
      setTelefono(empleado.telefono);
      setIdPuesto(empleado.id_puesto);
      setFechaContratacion(empleado.fecha_contratacion || '');
    }
  }, [empleado]);

  // Cargar los puesto desde la API
  useEffect(() => {
    const fetchPuestos = async () => {
      try {
        const puestosData = await getPuestos();
        setPuestos(puestosData);
      } catch (error) {
        console.error('Error al obtener los puestos:', error);
      }
    }

    fetchPuestos();
  }, [])

  const handleSave = () => {
    if (!empleado) return;

    const updatedEmpleado: Empleado = {
      ...empleado,
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      email,
      telefono,
      id_puesto: idPuesto!,
      fecha_contratacion: fechaContratacion,
    };

    onSave(updatedEmpleado);
    onClose();
  };

  return (
    <dialog open={isOpen} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className='bg-white rounded-lg shadow-lg w-full max-w-lg p-6'>
        <h2 className="text-xl font-bold mb-4">Editar Empleado</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Nombre</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Apellido Paterno</label>
            <input type="text" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Apellido Materno</label>
            <input type="text" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Teléfono</label>
            <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Puesto</label>
            <select
              id="id_puesto"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={idPuesto}
              onChange={(e) => setIdPuesto(Number(e.target.value))}
              required
            >
              <option value="">Selecciona un puesto</option>
              {puestos.map((puesto) => (
                <option key={puesto.id} value={puesto.id}>
                  {puesto.nombre_puesto}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Fecha de Contratación</label>
            <input type="date" value={fechaContratacion} onChange={(e) => setFechaContratacion(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
          </div> */}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancelar</button>
            <button type="button" onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">Guardar</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default DialogEmpleado;
