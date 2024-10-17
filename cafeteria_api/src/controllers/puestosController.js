const Puestos = require("../models/puestosModel")


const puestosController = {
  /**
   * Obtener todos los puestos
   * @param {Object} req - Solicitud
   * @param {Object} res - Respuesta
   * @returns {Promise<void>}
   */
  getAllPuestos: async (req, res) => {
    try {
      const puestos = await Puestos.getAll()
      res.json(puestos)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Obtener un puesto por su id
   * @param {Object} req - Solicitud
   * @param {Object} res - Respuesta
   * @returns {Promise<void>}
   */
  getPuestoById: async (req, res) => {
    const { id } = req.params
    try {
      const puesto = await Puestos.getById(id)
      if (puesto) {
        res.json(puesto)
      } else {
        res.status(404).json({ message: "Puesto no encontrado" })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Crear un nuevo puesto
   * @param {Object} req - Solicitud
   * @param {Object} res - Respuesta
   * @returns {Promise<void>}
   */
  createPuesto: async (req, res) => {
    const { nombre_puesto } = req.body
    try {
      const nuevoPuesto = await Puestos.create(nombre_puesto)
      res.status(201).json(nuevoPuesto)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },


  /**
   * Actualizar un puesto
   * @param {Object} req - Solicitud
   * @param {Object} res - Respuesta
   * @param {Number} req.body.id - Identificador del puesto
   * @param {String} req.body.nombre_puesto - Nuevo nombre del puesto
   * @returns {Promise<void>}
   */
  updatePuesto: async (req, res) => {
    const { id } = req.body
    const { nombre_puesto } = req.body
    try {
      const puestoActualizado = await Puestos.update(id, nombre_puesto)
      if (puestoActualizado) {
        res.json(puestoActualizado)
      } else {
        res.status(404).json({ message: "Puesto no encontrado" })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },


  /**
   * Eliminar un puesto
   * @param {Object} req - Solicitud
   * @param {Object} res - Respuesta
   * @param {Number} req.params.id - Identificador del puesto a eliminar
   * @returns {Promise<void>}
   */
  deletePuesto: async (req, res) => {
    const { id } = req.params
    try {
      const puestoEliminado = await Puestos.delete(id)
      if (puestoEliminado) {
        res.json(puestoEliminado)
      } else {
        res.status(404).json({ message: "Puesto no encontrado" })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}


module.exports = puestosController