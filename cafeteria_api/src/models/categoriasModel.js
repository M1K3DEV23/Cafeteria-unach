const db = require('../config/db')


const getCategorias = async () => {
  const { rows } = await db.query('SELECT * FROM categorias');
  return rows;
}

// OBtener categoria por id
const getCategoriaById = async (id) => {
  const { rows } = await db.query('SELECT * FROM categorias WHERE id = $1', [id])
  return rows[0];
}

// Crear una categoria
const createCategoria = async (nombre, descripcion) => {
  const { rows } = await db.query('INSERT INTO categorias (nombre, descripcion) VALUES ($1, $2) RETURNING *', [nombre, descripcion])
  return rows[0]
}

// Actualizar categoria
const updateCategoria = async (id, nombre, descripcion) => {
  const { rows } = await db.query(
    'UPDATE categorias SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *',
    [nombre, descripcion, id]
  );
  return rows[0];
};

// Borrar una categroia
const deleteCategoria = async (id) => {
  const { rows } = await db.query('DELETE FROM categorias WHERE id = $1 RETURNING *', [id])
  return rows[0]
}


module.exports = {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
}