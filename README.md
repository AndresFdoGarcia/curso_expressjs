# curso_expressjs

Para inciar se debe:
```bash
npm install
```
Para iniciar en modo dev
```bash
npm run dev
```
## Configuración Base de datos
Al usar docker, se debe ubicar en la carpeta que contiene el archivo `docker-compose.yml`, se debe ejecutar
```bash
# Levantar el contenedor
docker compose up -d
```

***(Opcional)*** Si se desea revisar la conexion se puede ejecutar:

```bash
docker exec -it <id del contedor> /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P <contraseña> -C -N
```
Luego se puede validar la creación de la base de datos
```sql
EXEC sp_databases
GO
```

## Configuración Prisma
- Se debe asegurar que la base de datos se ha generado correctamente
- Configurar los modelos y la conexión
```bash
npx prisma generate
# Se persisten los modelos de datos en la base
npx prisma db push
```

Si se desea actualizar la base de datos con los modelos se puede ejecutar:
```bash
npx prisma migrate dev --name <nombre migracion>
# Autorizas la creación de la migración
npx prisma migrate reset
# Si falla la migración se puede ejecutar:
npx prisma migrate resolve --applied <nombre migracion>
# Si se desea eliminar la migración
npx prisma migrate reset
# Si se desea eliminar la base de datos
npx prisma migrate reset --force
# o se puede pushear la base de datos
npx prisma db push
```
En caso de no funcionar se puede ejecutar:
```bash
npx prisma db push
```
  