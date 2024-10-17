const { query } = require('../config/db')


const getAllEmpleados = async () => {
  const { rows } = await query('SELECT * FROM empleados')
  return rows
}

const getEmpleadoById = async (id) => {
  const { rows } = await query('SELECT * FROM empleados WHERE id = $1', [id])
  return rows[0]
}


const createEmpleado = async (empleado) => {
  const { nombre, apellido_paterno, apellido_materno, email, telefono, id_puesto } = empleado
  const result = await query('INSERT INTO empleados (nombre, apellido_paterno, apellido_materno, email, telefono, id_puesto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [nombre, apellido_paterno, apellido_materno, email, telefono, id_puesto])
  return result.rows[0]
}

const updateEmpleado = async (id, empleado) => {
  const { nombre, apellido_paterno, apellido_materno, email, telefono, id_puesto } = empleado
  const result = await query(
    'UPDATE empleados SET nombre = $1, apellido_paterno = $2, apellido_materno = $3, email = $4, telefono = $5, id_puesto = $6 WHERE id = $7 RETURNING *',
    [nombre, apellido_paterno, apellido_materno, email, telefono, id_puesto, id]
  )
  return result.rows[0]
}


const deleteEmpleado = async (id) => {
  await query('DELETE FROM empleados WHERE id = $1', [id])
}

module.exports = {
  getAllEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado
}