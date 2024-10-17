const express = require('express')
const router = express.Router()
const carrerasController = require('../controllers/carrerasController')

router.post('/', carrerasController.crearCarrera)
router.get('/', carrerasController.obtenerCarreras)
router.get('/:id', carrerasController.obtenerCarreraPorId)
router.put('/:id', carrerasController.actualizarCarrera)
router.delete('/:id', carrerasController.eliminarCarrera)

module.exports = router