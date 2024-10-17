const path = require('path')
const fs = require('fs')

const productosModel = require('../models/productosModel')

const getProductos = async (req, res) => {

  try {
    const productos = await productosModel.getProductos()
    res.json(productos)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


const getProductosById = async (req, res) => {
  const { id } = req.params

  try {
    const producto = await productosModel.getProductosById(id)
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.json(producto)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const createProducto = async (req, res) => {
  const { nombre, descripcion, precio, cantidad_en_inventario, categoria_id } = req.body
  let imagen_url = null; // Obtener la URL de la imagen

  console.log('req.file', req.file)

  if (req.file) {
    // Obtener la URL relativa para el cliente
    imagen_url = `uploads/${path.basename(req.file.path)}`;

    // imagen_url = path.basename(req.file.path)
    // imagen_url = `uploads/${imagen_url}`
  }

  try {
    const producto = await productosModel.createProducto(nombre, descripcion, precio, cantidad_en_inventario, categoria_id, imagen_url)
    res.status(201).json(producto)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el producto' })
  }
}


const updateProducto = async (req, res) => {
  const { id } = req.params
  const { nombre, descripcion, precio, cantidad_en_inventario, categoria_id } = req.body
  let imagen_url = null;

  console.log('req.file', req.file)

  if (req.file) {
    // Obtener la URL relativa para el cliente
    imagen_url = `uploads/${path.basename(req.file.path)}`;
    // imagen_url = path.basename(req.file.path)
    // imagen_url = `uploads/${imagen_url}`
  }
  try {
    const producto = await productosModel.updateProducto(id, nombre, descripcion, precio, cantidad_en_inventario, categoria_id, imagen_url)
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.status(200).json(producto)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


const deleteProducto = async (req, res) => {
  const { id } = req.params

  try {
    const producto = await productosModel.deleteProducto(id)
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    if (producto.imagen_url) {
      const imagenPath = path.join(__dirname, "..", "..", producto.imagen_url)

      fs.unlinkSync(imagenPath, (err) => {
        if (err) {
          console.error("Error al eliminar la imagen:", err)
          return res.status(500).json({ error: "Error al eliminar la imagen" })
        }
      })
    }

    res.json({ message: "Producto eliminado" })
  } catch (err) {
    res.status(500).json({ error: error.message })
  }
}


module.exports = {
  getProductos,
  getProductosById,
  createProducto,
  updateProducto,
  deleteProducto,
}