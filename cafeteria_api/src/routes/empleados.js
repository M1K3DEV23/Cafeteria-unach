
const express = require("express")

const empleadosController = require("../controllers/empleadosController")


const router = express.Router()


router.get("/", empleadosController.getEmpleados)
router.get("/:id", empleadosController.getEmpleado)
router.post("/", empleadosController.createEmpleado)
router.put("/:id", empleadosController.updateEmpleado)
router.delete("/:id", empleadosController.deleteEmpleado)


module.exports = router