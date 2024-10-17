const empleadosModel = require('../models/empleadosModel')


const getEmpleados = async (req, res) => {
  const empleados = await empleadosModel.getAllEmpleados()
  res.json(empleados);
}

const getEmpleado = async (req, res) => {
  const { id } = req.params
  const empleado = await empleadosModel.getEmpleadoById(id)
  res.json(empleado)
}

const createEmpleado = async (req, res) => {
  const nuevoEmpleado = await empleadosModel.createEmpleado(req.body)
  res.status(201).json(nuevoEmpleado)
}

const updateEmpleado = async (req, res) => {
  const { id } = req.params
  const updatedEmpleado = await empleadosModel.updateEmpleado(id, req.body)
  res.json(updatedEmpleado)
}

const deleteEmpleado = async (req, res) => {
  const { id } = req.params
  await empleadosModel.deleteEmpleado(id)
  res.status(204).send()
}

module.exports = {
  getEmpleados,
  getEmpleado,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado
}