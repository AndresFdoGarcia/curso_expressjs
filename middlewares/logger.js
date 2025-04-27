export const loggerMiddleware = (req, res, next) => {
    const { method, url } = req;
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}] ${method} request to ${url}`);

    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${timestamp}] Response ${res.statusCode} - ${duration}ms`);
    });
    res.on('error', (err) => {
        console.error(`[${timestamp}] Error during ${method} request to ${url}:`, err);
    });

    next();
}
    