const Carrera = require('../models/carreraModel')

exports.crearCarrera = async (req, res) => {
  try {
    const { nombre } = req.body
    const nuevaCarrera = await Carrera.crearCarrera(nombre)
    res.status(201).json(nuevaCarrera)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


exports.obtenerCarreras = async (req, res) => {
  try {
    const carreras = await Carrera.obtenerCarreras()
    res.status(200).json(carreras)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.obtenerCarreraPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const carrera = await Carrera.obtenerCarreraPorId(id);
    if (carrera) {
      res.status(200).json(carrera);
    } else {
      res.status(404).json({ message: 'Carrera no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarCarrera = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre } = req.body
    const carreraActualizada = await Carrera.actualizarCarrera(id, nombre)
    if (carreraActualizada) {
      res.status(200).json(carrera)
    } else {
      res.status(404).json({ error: 'Carrera no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


exports.eliminarCarrera = async (req, res) => {
  try {
    const { id } = req.params
    const carreraEliminada = await Carrera.eliminarCarrera(id)
    if (carreraEliminada) {
      res.status(200).json({ message: 'Carrera eliminada' })
    } else {
      res.status(404).json({ error: 'Carrera no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}