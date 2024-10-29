const { getAllAlumnos } = require('../models/alumnosModel')



const getAlumnos = async (req, res) => {
  try {
    const alumnos = await getAllAlumnos()
    res.status(200).json(alumnos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}



module.exports = {
  getAlumnos,
}