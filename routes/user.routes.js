import express from 'express';
import { getUser, serchQueryParamsUser, validateForm, readUserFile,createUser, updateUser, deleteUser,getUserByEmail, dbUsers, dbRegister, dbLogin } from '../components/user/user.js';
import validateSearchParams from '../middlewares/validateSearch.js';
import { authenticateToken } from '../middlewares/auth.js';


const router = express.Router();

// Ruta de búsqueda con validación
router.get('/api/test/search', validateSearchParams, serchQueryParamsUser);
router.get('/api/users/search/', getUserByEmail);

// Ruta para obtener usuario por ID
router.get('/api/users/:id',getUser,);


router.post('/api/users/form', validateForm);
router.get('/api/users', readUserFile);

// Ruta para crear un nuevo usuario
router.post('/api/users',createUser);

// Ruta para actualizar un usuario existente
router.patch('/api/users/:id', updateUser);

// Ruta para eliminar un usuario
router.delete('/api/users/:id', deleteUser);

router.get('/api/error', (req, res, next) => {
    next(new Error('This is a forced error for testing purposes.'));
});

router.get('/api/db_users', dbUsers);

router.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

router.post('/api/users/register', dbRegister);

router.post('/api/login', dbLogin);

export default router;