const express = require('express');
const router = express.Router();
const { getUser, serchQueryParamsUser } = require('../controllers/user/user.controller');
const validateSearchParams = require('../middlewares/validateSearch');

// Ruta de búsqueda con validación
router.get('/search', validateSearchParams, serchQueryParamsUser);

// Ruta para obtener usuario por ID
router.get('/:id', getUser);

module.exports = router;