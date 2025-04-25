import express from 'express';
import { getUser, serchQueryParamsUser, validateForm, readUserFile } from '../components/user/user.js';
import validateSearchParams from '../middlewares/validateSearch.js';

const router = express.Router();

// Ruta de búsqueda con validación
router.get('/api/users/search', validateSearchParams, serchQueryParamsUser);

// Ruta para obtener usuario por ID
router.get('/api/users/:id', getUser);

router.post('/api/users/form', validateForm);
router.get('/api/users', readUserFile);

export default router;