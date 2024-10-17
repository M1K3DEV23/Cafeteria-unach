const express = require('express');
const router = express.Router()
const upload = require('../config/multerConfig')
const productosController = require('../controllers/productosController')


// Obtener todos los productos
router.get('/', productosController.getProductos)
// Obtener un producto por ID
router.get('/:id', productosController.getProductosById)
// Crear un nuevo producto (manejar imagen)
router.post('/', upload, productosController.createProducto);

// Actualizar un producto (manejar imagen)
router.put('/:id', upload, productosController.updateProducto);

// Borrar un producto
router.delete('/:id', productosController.deleteProducto);


module.exports = router