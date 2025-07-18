# 🚀 Curso Express.js - Proyecto Base

Bienvenido al proyecto base del curso de Express.js. Aquí encontrarás una estructura profesional para desarrollar APIs RESTful modernas utilizando Node.js, Express, Prisma y SQL Server, con integración de Docker para facilitar el despliegue y pruebas locales.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js** (v18+)
- **Express.js**
- **Prisma ORM**
- **SQL Server** (en contenedor Docker)
- **Docker & Docker Compose**
- **Swagger (OpenAPI)**
- **bcryptjs** (hash de contraseñas)
- **jsonwebtoken** (autenticación JWT)

---

## 🏗️ Patrón de Diseño Empleado

El proyecto sigue el patrón **MVC (Modelo-Vista-Controlador)** adaptado para APIs REST, donde:

- **Modelos**: Definidos con Prisma en la carpeta `/prisma`.
- **Controladores**: Gestionan la lógica de las rutas y se ubican en `/components`.
- **Rutas**: Definidas en `/routes`, separando la lógica de negocio de la definición de endpoints.
- **Middlewares**: Para autenticación, validación y otras funciones reutilizables, en `/middlewares`.

Esta estructura facilita la escalabilidad, el mantenimiento y la separación de responsabilidades.

---

## ⚡ Inicio Rápido

### 1. Clona el repositorio e instala dependencias

```bash
git clone <url-del-repo>
cd express_nodejs
npm install
```

---

### 2. Configura la base de datos con Docker

Ubícate en la carpeta que contiene el archivo `docker-compose.yml` y ejecuta:

```bash
docker compose up -d
```

**(Opcional)** Para conectarte al contenedor y revisar la base de datos:

```bash
docker exec -it <id-del-contenedor> /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P <contraseña> -C -N
```

Verifica la creación de la base de datos:

```sql
EXEC sp_databases
GO
```

---

### 3. Configuración de Prisma

Asegúrate de que la base de datos esté corriendo y correctamente configurada. Luego ejecuta:

```bash
# Crear la migración inicial
npx prisma migrate dev --name init
```

Si ocurre algún error durante la migración:

```bash
npx prisma migrate reset
# Si es necesario, marca una migración como aplicada
npx prisma migrate resolve --applied <nombre-migracion>
```

---

### 4. 🌱 Carga de Datos Iniciales

El proyecto incluye un archivo de semilla llamado [seed.js](./seed.js) que inserta datos útiles para pruebas y desarrollo.

```bash
node seed.js
```

---

## 🏁 Cómo arrancar el proyecto

```bash
npm run dev
```

El servidor estará disponible en [http://localhost:5000](http://localhost:5000).

---

## 📚 Documentación de la API

La documentación interactiva está disponible en:  
[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 📂 Estructura del Proyecto

```
express_nodejs/
│
├── components/           # Lógica de negocio y controladores
├── middlewares/          # Middlewares personalizados (auth, validaciones, etc.)
├── prisma/               # Archivos de Prisma y migraciones
├── routes/               # Definición de rutas Express
├── seed.js               # Script de datos iniciales
├── docker-compose.yml    # Configuración de Docker
├── .env                  # Variables de entorno
└── README.md             # Este archivo
```

---

## 💡 Notas adicionales

- Asegúrate de tener configurado el archivo `.env` con las variables necesarias (puedes usar `.env.example` como base).
- Los endpoints protegidos requieren autenticación JWT. Consulta la documentación Swagger para probarlos.
- Para modificar los datos iniciales, edita el archivo [seed.js](./seed.js).

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, abre un issue o pull request para sugerencias o mejoras.

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

