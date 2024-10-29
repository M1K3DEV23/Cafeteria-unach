const express = require('express')
const cors = require('cors')
const path = require('path')


const app = express()
// PUERTO DE LA APLICACION
const port = 3000;

// Permitir CORS para todas las rutas
app.use(cors({
  origin: '*'
}))


// Middleware para manejar archivos estaticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Middleware para JSON
app.use(express.json())


// RUTAS
const categoriasRoutes = require('./src/routes/categorias')
const productoRoutes = require('./src/routes/productos')
const puestosRouter = require('./src/routes/puestos')
const empleadoRouter = require('./src/routes/empleados')
const alumnosRouter = require('./src/routes/alumnos')

app.use('/categorias', categoriasRoutes)
app.use('/productos', productoRoutes)
app.use('/puestos', puestosRouter)
app.use('/empleados', empleadoRouter)
app.use('/alumnos', alumnosRouter)


// Punto de entrada de mi aplicacion
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})