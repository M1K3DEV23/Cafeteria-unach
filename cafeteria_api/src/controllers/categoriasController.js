const categoriasModel = require('../models/categoriasModel')


const getCategorias = async (req, res) => {
  try {
    const categorias = await categoriasModel.getCategorias()
    res.json(categorias)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getCategoriaById = async (req, res) => {
  const { id } = req.params

  try {
    const categoria = await categoriasModel.getCategoriaById(id)
    if (!categoria) {
      return res.status(404).json({ erorr: 'Categoría no encontrada' })
    }
    res.json(categoria)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


const createCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body
  try {
    const categoria = await categoriasModel.createCategoria(nombre, descripcion)
    res.status(201).json(categoria)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateCategoria = async (req, res) => {
  const { id } = req.params
  const { nombre, descripcion } = req.body
  try {
    const categoria = await categoriasModel.updateCategoria(id, nombre, descripcion)
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' })
    }
    res.json(categoria)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


const deleteCategoria = async (req, res) => {
  const { id } = req.params
  try {
    const categoria = await categoriasModel.deleteCategoria(id)
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' })
    }
    res.json({ message: 'Categoría eliminada' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


module.exports = {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
}