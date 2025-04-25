const validateSearchParams = (req, res, next) => {
    const { termino, categoria } = req.query;

    // Validar que existan los parámetros requeridos
    if (!termino || !categoria) {
        return res.status(400).json({
            error: 'El parámetro de búsqueda "termino" y "categoría" son requeridos'
        });
    }

    // Validar longitud mínima del término de búsqueda
    if (termino.length < 3 || categoria.length < 3) {
        return res.status(400).json({
            error: 'El término de búsqueda debe tener al menos 3 caracteres'
        });
    }


    // Si todo está bien, continuar con el siguiente middleware o controlador
    next();
};

module.exports = validateSearchParams;