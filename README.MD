# 📦 Proyecto de Cafetería (FullStack App)

**Descripción**
Este es un sistema de gestión para una cafetería, desarrollado con una arquitectura FullStack. Utiliza Express.js para la API del backend, React.js para el frontend y PostgreSQL como base de datos.

Tech Stack:

- **Backend**: Express.js
- **Frontend**: React.js
- **Base de Datos**: PostgreSQL

---

## Estructura del Proyecto

```markdown
DB/
cafeteria_api/
 ├── src/
 │   ├── config/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 ├── uploads/
 ├── .env
 ├── index.js
cafeteria_react/
 ├── src/
 │   ├── assets/
 │   ├── components/
 │   ├── pages/
 │   ├── services/
```

## 📂 Descripción de Carpetas

### 📁 `DB/`

Contiene los archivos SQL necesarios para crear y configurar la base de datos en PostgreSQL. Asegúrate de ejecutar estos scripts antes de iniciar la aplicación para configurar correctamente las tablas y relaciones de la base de datos.

### 📁 `cafeteria_api/`

Directorio del backend de la aplicación, construido con Express.js.

`src/config/`: Configuraciones generales, como la configuración de conexión a la base de datos.

`src/controllers/`: Contiene los controladores que gestionan la lógica de negocio, interactuando con los modelos y devolviendo respuestas.

`src/models/`: Define los modelos de la base de datos para interactuar con PostgreSQL.

`src/routes/`: Configuración de las rutas de la API, organizadas según los distintos recursos (e.g., empleados, categorías, productos).

`uploads/`: Carpeta donde se almacenan los archivos subidos, como imágenes de productos o menús.

`index.js`: Punto de entrada de la API donde se inicializa Express, las rutas y la conexión a la base de datos.

### 📁 `cafeteria_react/`

Directorio del frontend de la aplicación, construido con React.js.

`src/assets/`: Contiene imágenes, íconos y otros archivos estáticos usados en la aplicación.

`src/components/`: Componentes reutilizables que forman la interfaz de usuario, como botones, menús o formularios.

`src/pages/`: Representa las páginas de la aplicación, como el catálogo de productos, la página de inicio, o el sistema de pedidos.

`src/services/`: Define los servicios para interactuar con el backend, encapsulando las llamadas a la API.

---

## 🛠️ Configuración e Instalación

### Prerrequisitos

- Node.js >= 20.x
- PostgreSQL >= 16.x

### Configurar la Base de Datos

1. Accede a la carpeta `DB/` y ejecuta el archivo SQL para crear la estructura de la base de datos.

2. Crea un archivo `.env` en la carpeta **cafeteria_api** con las siguientes variables:

```javascript
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
```

### Instalación del Backend

```bash
cd cafeteria_api
npm install
```

### Instalación del Frontend

```bash
cd ../cafeteria_react
npm install
```

### Ejecutar la Aplicación

Para iniciar el backend:

```bash
cd cafeteria_api
node index.js

```

Para iniciar el frontend:

```bash
cd /cafeteria_react
npm run dev -- --open
```

---

## 📚 Diccionario de Datos

### Tabla: `categorias`

| Campo        | Tipo de Dato       | Restricciones              | Descripción                   |
|--------------|--------------------|----------------------------|-------------------------------|
| id           | SERIAL             | PRIMARY KEY                | Identificador único de la categoría |
| nombre       | VARCHAR(50)        | NOT NULL                   | Nombre de la categoría        |
| descripcion  | TEXT               |                            | Descripción de la categoría   |

---

### Tabla: `productos`

| Campo                 | Tipo de Dato      | Restricciones              | Descripción                                      |
|-----------------------|-------------------|----------------------------|--------------------------------------------------|
| id                    | SERIAL            | PRIMARY KEY                | Identificador único del producto                 |
| nombre                | VARCHAR(100)      | NOT NULL                   | Nombre del producto                              |
| descripcion           | TEXT              |                            | Descripción del producto                         |
| precio                | DECIMAL(10, 2)    | NOT NULL                   | Precio del producto                              |
| cantidad_en_inventario| INTEGER           | NOT NULL                   | Cantidad disponible en inventario                |
| categoria_id          | INT               | REFERENCES categorias(id)  | Identificador de la categoría del producto       |
| imagen_url            | VARCHAR(255)      |                            | URL de la imagen del producto                    |

---

### Tabla: `puestos`

| Campo        | Tipo de Dato       | Restricciones              | Descripción                   |
|--------------|--------------------|----------------------------|-------------------------------|
| id           | SERIAL             | PRIMARY KEY                | Identificador único del puesto |
| nombre_puesto| VARCHAR(50)        | NOT NULL                   | Nombre del puesto             |

---

### Tabla: `empleados`

| Campo             | Tipo de Dato       | Restricciones                          | Descripción                                 |
|-------------------|--------------------|----------------------------------------|---------------------------------------------|
| id                | SERIAL             | PRIMARY KEY                            | Identificador único del empleado            |
| nombre            | VARCHAR(50)        | NOT NULL                               | Nombre del empleado                         |
| apellido_paterno  | VARCHAR(50)        | NOT NULL                               | Apellido paterno del empleado               |
| apellido_materno  | VARCHAR(50)        |                                        | Apellido materno del empleado (opcional)    |
| email             | VARCHAR(100)       | NOT NULL, UNIQUE                       | Correo electrónico único del empleado       |
| telefono          | VARCHAR(15)        |                                        | Número de teléfono del empleado (opcional)  |
| id_puesto         | INT                | NOT NULL, REFERENCES puestos(id)       | Identificador del puesto del empleado       |
| fecha_contratacion| TIMESTAMPTZ        | DEFAULT CURRENT_TIMESTAMP              | Fecha de contratación del empleado          |

---

### Tabla: `alumnos`

| Campo             | Tipo de Dato       | Restricciones                          | Descripción                                 |
|-------------------|--------------------|----------------------------------------|---------------------------------------------|
| matricula         | VARCHAR(20)        | PRIMARY KEY                            | Identificador único de la matrícula         |
| nombre            | VARCHAR(50)        | NOT NULL                               | Nombre del alumno                           |
| apellido_paterno  | VARCHAR(50)        | NOT NULL                               | Apellido paterno del alumno                 |
| apellido_materno  | VARCHAR(50)        |                                        | Apellido materno del alumno (opcional)      |
| grupo             | CHAR(2)            | NOT NULL                               | Grado académico del alumno                  |
| carrera           | VARCHAR(50)        | NOT NULL                               | Carrera del alumno                          |

---
