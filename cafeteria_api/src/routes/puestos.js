
const express = require('express')
const puestosController = require("../controllers/puestosController")

const router = express.Router()

router.get("/", puestosController.getAllPuestos)
router.get("/:id", puestosController.getPuestoById)
router.post("/", puestosController.createPuesto)
router.put("/:id", puestosController.updatePuesto)
router.delete("/:id", puestosController.deletePuesto)


module.exports = router