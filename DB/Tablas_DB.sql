/*markdown
# Esquema Base de Datos
*/

/*markdown
## Tabla Categorias
*/

CREATE TABLE categorias (
  id Serial Primary KEY,
  nombre VARCHAR(50) NOT NULL,
  descripcion TEXT
);

/*markdown
1. **Tabla categorias**

- Esta tabla almacenará las categorías de productos, como "Antojitos", "Desayunos", "Comidas", "Aguas Frescas", "Abarrotes", etc.

### **Columnas**:

- **id** SERIAL PRIMARY KEY: Identificador único de la categoría.

- **nombre** VARCHAR(50) NOT NULL: Nombre de la categoría (Ej. "Abarrotes").

- **descripcion** TEXT: Descripción opcional de la categoría.
*/

/*markdown
### INSERTANDO DATOS DE EJEMPLO
*/

-- Insertar categorías de ejemplo
INSERT INTO categorias (nombre, descripcion) VALUES
('Antojitos', 'Productos para disfrutar como bocadillos o snacks.'),
('Desayunos', 'Comidas ligeras y energéticas para el desayuno.');


/*markdown

### Tabla de productos
*/

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    cantidad_en_inventario INTEGER NOT NULL,
    categoria_id INT REFERENCES categorias(id)
);

/*markdown
2. **Tabla productos**


- Esta tabla almacenará los productos disponibles en la cafetería, asociados con su categoría correspondiente.

### **Columnas**:

- **id** SERIAL PRIMARY KEY: Identificador único del producto.

- **nombre** VARCHAR(100) NOT NULL: Nombre del producto (Ej. "Sabritas").

- **descripcion** TEXT: Descripción detallada del producto.

- **precio** DECIMAL(10, 2) NOT NULL: Precio del producto en pesos mexicanos.

- **cantidad_en_inventario** INTEGER NOT NULL: Cantidad disponible en inventario.

- **categoria_id INT REFERENCES** categorias(id): Categoría a la que pertenece el producto.
*/

/*markdown
### INSERTANDO DATOS DE EJEMPLO
*/

-- Insertar productos de ejemplo
INSERT INTO productos (nombre, descripcion, precio, cantidad_en_inventario, categoria_id) VALUES
('Sabritas', 'Paquete de papas fritas Sabritas', 15.00, 50, 1),
('Pan de Caja', 'Paquete de pan de caja blanco', 30.00, 20, 2);


/*markdown
### Actualizando mi tabla de productos
*/

ALTER TABLE productos
ADD COLUMN imagen_url VARCHAR(255);

/*markdown
# Tabla de empleados
*/

/*markdown
### Tabla de `Puestos`
*/

CREATE TABLE puestos (
  id SERIAL PRIMARY KEY,
  nombre_puesto VARCHAR(50) NOT NULL
);

/*markdown
### Tabla `empleados`
*/

CREATE TABLE empleados (
    id SERIAL PRIMARY KEY, -- Clave primaria autoincremental
    nombre VARCHAR(50) NOT NULL, -- Nombre del empleado
    apellido_paterno VARCHAR(50) NOT NULL, -- Apellido paterno
    apellido_materno VARCHAR(50), -- Apellido materno (opcional)
    email VARCHAR(100) NOT NULL UNIQUE, -- Correo electrónico único
    telefono VARCHAR(15), -- Número de teléfono (opcional)
    id_puesto INT NOT NULL, -- Llave foránea a la tabla puestos
    fecha_contratacion TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, -- Fecha de contratación
    CONSTRAINT fk_id_puesto FOREIGN KEY (id_puesto) REFERENCES puestos(id) ON DELETE SET NULL -- Relación con la tabla puestos
);


/*markdown

### Tabla `Carreras`

*/

CREATE TABLE carreras (
    id_carrera SERIAL PRIMARY KEY, -- Clave primaria con autoincremento
    nombre_carrera VARCHAR(100) NOT NULL, -- Nombre de la carrera
    fecha_creacion TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP -- Fecha de creación
);

/*markdown
### Tabla `Alumnos`
*/

CREATE TABLE alumnos (
    matricula VARCHAR(20) PRIMARY KEY, -- Clave primaria con formato de matrícula única
    nombre VARCHAR(50) NOT NULL, -- Nombre del alumno
    apellido_paterno VARCHAR(50) NOT NULL, -- Apellido paterno
    apellido_materno VARCHAR(50), -- Apellido materno (puede ser opcional)
    grado INT NOT NULL, -- Grado académico
    grupo CHAR(1) NOT NULL, -- Grupo (generalmente es una letra)
    id_carrera INT NOT NULL, -- Llave foránea a la tabla carreras
    fecha_registro TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, -- Fecha de registro del alumno
    CONSTRAINT fk_id_carrera FOREIGN KEY (id_carrera) REFERENCES carreras (id_carrera) ON DELETE CASCADE -- Relación con la tabla carreras
);
