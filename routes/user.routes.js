const express = require('express');
const router = express.Router();
const { getUser, serchQueryParamsUser, validateForm, readUserFile } = require('../components/user/user');
const validateSearchParams = require('../middlewares/validateSearch');

// Ruta de búsqueda con validación
router.get('/api/users/search', validateSearchParams, serchQueryParamsUser);

// Ruta para obtener usuario por ID
router.get('/api/users/:id', getUser);

router.post('/api/users/form', validateForm);
router.get('/api/users', readUserFile);

module.exports = router;