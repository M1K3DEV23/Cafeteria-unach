const pool = require('../config/db')


const getAllAlumnos = async () => {
  const query = "SELECT * FROM alumnos"
  const { rows } = await pool.query(query)
  return rows
}


module.exports = {
  getAllAlumnos
}