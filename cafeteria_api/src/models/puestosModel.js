const { get } = require('http')
const pool = require('../config/db')

const Puestos = {
  /**
   * Obtener todos los puestos
   * @returns {Promise<Array<{}>>} Arreglo de puestos
   */
  getAll: async () => {
    const query = "SELECT * FROM puestos"
    const { rows } = await pool.query(query)
    return rows
  },

  /**
   * Obtener un puesto por su id
   * @param {Number} id Identificador del puesto
   * @returns {Promise<{}>} Un objeto con la informaci n del puesto
   */
  getById: async (id) => {
    const query = "SELECT * FROM puestos WHERE id = $1"
    const { rows } = await pool.query(query, [id])
    return rows[0]
  },

  create: async (nombre_puesto) => {
    const query = "INSERT INTO puestos (nombre_puesto) VALUES ($1) RETURNING *"
    const { rows } = await pool.query(query, [nombre_puesto])
    return rows[0];
  },

  update: async (id, nombre_puesto) => {
    const query = "UPDATE puestos SET nombre_puesto = $1 WHERE id = $2 RETURNING *"
    const { rows } = await pool.query(query, [nombre_puesto, id])
    return rows[0];
  },

  delete: async (id) => {
    const query = "DELETE FROM puestos WHERE id = $1 RETURNING *"
    const { rows } = await pool.query(query, [id])
    return rows[0];
  }

}

module.exports = Puestos