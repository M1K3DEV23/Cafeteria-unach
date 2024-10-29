CREATE TABLE categorias (
  id Serial Primary KEY,
  nombre VARCHAR(50) NOT NULL,
  descripcion TEXT
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    cantidad_en_inventario INTEGER NOT NULL,
    categoria_id INT REFERENCES categorias(id)
);

ALTER TABLE productos
ADD COLUMN imagen_url VARCHAR(255);

CREATE TABLE puestos (
  id SERIAL PRIMARY KEY,
  nombre_puesto VARCHAR(50) NOT NULL
);

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

CREATE TABLE carreras (
    id_carrera SERIAL PRIMARY KEY, -- Clave primaria con autoincremento
    nombre_carrera VARCHAR(100) NOT NULL, -- Nombre de la carrera
);

INSERT INTO carreras (nombre_carrera) VALUES ('LSC');

CREATE TABLE alumnos (
    matricula VARCHAR(20) PRIMARY KEY, -- Clave primaria con formato de matrícula única
    nombre VARCHAR(50) NOT NULL, -- Nombre del alumno
    apellido_paterno VARCHAR(50) NOT NULL, -- Apellido paterno
    apellido_materno VARCHAR(50), -- Apellido materno (puede ser opcional)
    grado CHAR(2) NOT NULL, -- Grado académico
    id_carrera INT NOT NULL, -- Llave foránea a la tabla carreras
    FOREIGN KEY (id_carrera) REFERENCES carreras(id_carrera)
);

INSERT INTO alumnos (matricula, nombre, apellido_paterno, apellido_materno, grado, id_carrera) VALUES
('A211261', 'LISANDRO', 'AGUILAR', 'CANO', '8J', 1),
('A211240', 'SAMUEL', 'AGUILAR', 'HERNANDEZ', '8J', 1),
('A211247', 'ANGEL NAHUM', 'AGUILAR', 'MARTINEZ', '8J', 1),
('A201061', 'JUAN JOSE', 'BAÑOS', 'CAMPOS', '8J', 1),
('A211267', 'ROCELIA', 'DIAZ', 'GIRON', '8J', 1),
('A211316', 'DAMIAN ABAD', 'GOMEZ', 'CASTILLEJOS', '8J', 1),
('A211305', 'ESTEFANI WENDALI', 'GOMEZ', 'GOMEZ', '8J', 1),
('A211266', 'CAROLINA DE JESUS', 'GUERRA', 'MARTINEZ', '8J', 1),
('A211273', 'KAREN IVON', 'HERNANDEZ', 'DOMINGUEZ', '8J', 1),
('A200776', 'ANA FABIOLA', 'HERNANDEZ', 'PEREZ', '8J', 1),
('A211399', 'SERGIO ANTONIO', 'LARA', 'GOMEZ', '8J', 1),
('A211246', 'VICTOR HUGO', 'LOPEZ', 'GOMEZ', '8J', 1),
('A211327', 'GUSTAVO GAEL', 'MAYORAL', 'PALACIOS', '8J', 1),
('A211263', 'LUIS ARTURO', 'MOLINA', 'NATAREN', '8J', 1),
('A200770', 'LEONOR DE LOS ANGELES', 'MONTEJO', 'ZUNUN', '8J', 1),
('A211269', 'ANTHONY MIGUEL', 'OLIVARES', 'ZAVALA', '8J', 1),
('A190557', 'VICTORIA VANESSA', 'PEREZ', 'GORDILLO', '8J', 1),
('A201182', 'MIGUEL ANGEL', 'RIOS', 'YAÑEZ', '8J', 1),
('A211274', 'NATALIA MONSERRAT', 'SANTIAGO', 'TORRES', '8J', 1),
('A211308', 'MAYRA DEL CARMEN', 'VILCHIS', 'MENDOZA', '8J', 1);
