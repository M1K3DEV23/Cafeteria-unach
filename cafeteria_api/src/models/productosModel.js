const db = require('../config/db')


const getProductos = async () => {
  const { rows } = await db.query('SELECT * FROM productos')
  return rows
}


const getProductosById = async (id) => {
  const { rows } = await db.query('SELECT * FROM productos WHERE id = $1', [id])
  return rows[0]
}

// Crear productos
const createProducto = async (nombre, descripcion, precio, cantidad_en_inventario, categoria_id, imagen_url) => {
  const { rows } = await db.query('INSERT INTO productos (nombre, descripcion, precio, cantidad_en_inventario, categoria_id, imagen_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [nombre, descripcion, precio, cantidad_en_inventario, categoria_id, imagen_url])
  return rows[0]
}

// Actualizar producto
const updateProducto = async (id, nombre, descripcion, precio, cantidad_en_inventario, categoria_id, imagen_url) => {
  const { rows } = await db.query('UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, cantidad_en_inventario = $4, categoria_id = $5, imagen_url = $6 WHERE id = $7 RETURNING *', [nombre, descripcion, precio, cantidad_en_inventario, categoria_id, imagen_url, id]);
  return rows[0]
}

// Borrar producto
const deleteProducto = async (id) => {
  const { rows } = await db.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
  return rows[0]
}


module.exports = {
  getProductos,
  getProductosById,
  createProducto,
  updateProducto,
  deleteProducto
}