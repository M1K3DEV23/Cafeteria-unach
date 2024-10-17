const pool = require('../config/db')

class Carrera {

  static async crearCarrera(nombre) {
    const query = 'INSERT INTO carreras (nombre_carrera) VALUES ($1) RETURNING *'
    const values = [nombre]
    const { rows } = await pool.query(query, values)
    return rows[0]
  }

  static async obtenerCarreras() {
    const query = 'SELECT * FROM carreras'
    const { rows } = await pool.query(query)
    return rows
  }

  static async obtenerCarreraPorId(id) {
    const query = 'SELECT * FROM carreras WHERE id_carrera = $1'
    const values = [id]
    const { rows } = await pool.query(query, values)
    return rows[0]
  }

  static async actualizarCarrera(id, nombre) {
    const query = 'UPDATE carreras SET nombre_carrera = $1 WHERE id_carrera = $2 RETURNING *'
    const values = [nombre, id]
    const { rows } = await pool.query(query, values)
    return rows[0]
  }

  static async eliminarCarrera(id) {
    const query = 'DELETE FROM carreras WHERE id_carrera = $1 RETURNING *'
    const values = [id]
    const { rows } = await pool.query(query, values)
    return rows[0]
  }
}

module.exports = Carrera;