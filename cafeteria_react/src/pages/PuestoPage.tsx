import React, { useEffect, useState } from 'react';
import { getPuestos, Puesto } from '../services/puestoService';

const PuestosPage: React.FC = () => {
  const [puestos, setPuestos] = useState<Puesto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPuestos = async () => {
      try {
        const data = await getPuestos();
        setPuestos(data);
      } catch (error) {
        setError('Error al cargar los puestos');
      } finally {
        setLoading(false);
      }
    };

    fetchPuestos();
  }, []);

  const handleDelete = (id: number) => {
    // Lógica para eliminar un puesto
    setPuestos(puestos.filter((puesto) => puesto.id !== id));
  };

  const handleEdit = (puesto: Puesto) => {
    // Lógica para editar un puesto
    console.log('Editar puesto:', puesto);
  };

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-center mb-8">Puestos</h1>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-gray-700">ID</th>
              <th className="py-3 px-6 text-left text-gray-700">Nombre del Puesto</th>
              <th className="py-3 px-6 text-left text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {puestos.map((puesto) => (
              <tr key={puesto.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{puesto.id}</td>
                <td className="py-3 px-6">{puesto.nombre_puesto}</td>
                <td className="py-3 px-6 flex space-x-2">
                  <button onClick={() => handleEdit(puesto)} className="text-blue-500 hover:text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(puesto.id)} className="text-red-500 hover:text-red-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PuestosPage;
