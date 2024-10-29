const express = require('express')
const router = express.Router()

const { getAlumnos } = require('../controllers/alumnosController')


router.get('/', getAlumnos)


module.exports = router