import express from 'express';
import { getUser, serchQueryParamsUser, validateForm, readUserFile,createUser, updateUser, deleteUser,getUserByEmail, dbUsers, dbRegister, dbLogin } from '../components/user/user.js';
import { createAppointment, listReservations } from '../components/Appointments/appointment.js';
import { creatTimeBlock, listTimeBlocks } from '../components/TimeBlock/timeblock.js';
import validateSearchParams from '../middlewares/validateSearch.js';
import { authenticateToken } from '../middlewares/auth.js';


const router = express.Router();

/**
 * @swagger
 * /api/test/search:
 *   get:
 *     summary: Buscar usuarios con validación de parámetros
 *     parameters:
 *       - in: query
 *         name: termino
 *         schema:
 *           type: string
 *         required: true
 *         description: Término de búsqueda
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         required: true
 *         description: Categoría de búsqueda
 *     responses:
 *       200:
 *         description: Resultados de la búsqueda
 */
// Ruta de búsqueda con validación
router.get('/api/test/search', validateSearchParams, serchQueryParamsUser);

/**
 * @swagger
 * /api/test/search/:
 *   get:
 *     summary: Buscar usuario por email
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/api/test/search/', getUserByEmail);

/**
 * @swagger
 * /api/test/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
// Ruta para obtener usuario por ID
router.get('/api/test/:id',getUser,);

/**
 * @swagger
 * /api/test/form:
 *   post:
 *     summary: Validar y enviar formulario de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Formulario enviado correctamente
 */
router.post('/api/test/form', validateForm);

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Obtener todos los usuarios desde archivo JSON
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/api/test', readUserFile);

/**
 * @swagger
 * /api/test:
 *   post:
 *     summary: Crear un nuevo usuario en archivo JSON
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 */
// Ruta para crear un nuevo usuario
router.post('/api/test',createUser);

/**
 * @swagger
 * /api/test/{id}:
 *   patch:
 *     summary: Actualizar un usuario existente en archivo JSON
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
// Ruta para actualizar un usuario existente
router.patch('/api/test/:id', updateUser);

/**
 * @swagger
 * /api/test/{id}:
 *   delete:
 *     summary: Eliminar un usuario en archivo JSON
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
// Ruta para eliminar un usuario
router.delete('/api/test/:id', deleteUser);

/**
 * @swagger
 * /api/error:
 *   get:
 *     summary: Forzar un error para pruebas
 *     responses:
 *       500:
 *         description: Error forzado
 */
router.get('/api/error', (req, res, next) => {
    next(new Error('This is a forced error for testing purposes.'));
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios desde la base de datos
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida de la base de datos
 */
router.get('/api/users', dbUsers);

/**
 * @swagger
 * /api/protected:
 *   get:
 *     summary: Ruta protegida con autenticación JWT
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso permitido
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: Token inválido
 */
router.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar un nuevo usuario en la base de datos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Usuario registrado
 */
router.post('/api/users/register', dbRegister);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login de usuario y obtención de token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 *       404:
 *         description: Usuario no encontrado
 */
router.post('/api/login', dbLogin);


/**
 * @swagger
 * /api/timeblock:
 *   get:
 *     summary: Listar todos los bloques de tiempo
 *     security: 
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de bloques de tiempo
 */

router.get('/api/timeblock', authenticateToken, listTimeBlocks);

/**
 * @swagger
 * /api/timeblock:
 *   post:
 *     summary: Crear un nuevo bloque de tiempo
 *     security: 
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start:
 *                 type: string
 *                 format: date-time
 *               end:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Bloque de tiempo creado
 */
router.post('/api/timeblock', authenticateToken , creatTimeBlock);


/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Crear una nueva cita
 *     security: 
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               timeBlockId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cita creada
 */
router.post('/api/appointments',authenticateToken, createAppointment);

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Listar todas las citas
 *     security: 
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de citas
 */
router.get('/api/appointments', authenticateToken, listReservations);
/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Obtener una cita por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la cita
 *     responses:
 *       200:
 *         description: Cita encontrada
 *       404:
 *         description: Cita no encontrada
 */
router.get('/api/appointments/:id', (req, res) => {
    const { id } = req.params;
    // Aquí puedes implementar la lógica para obtener una cita por ID
    res.status(200).json({ message: `Cita con ID ${id} encontrada` });
}
);

export default router;