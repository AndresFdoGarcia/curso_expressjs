export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const statusMessage = err.statusMessage || 'Internal Server Error';
    const timestamp = new Date().toLocaleString();
    console.error(`[${timestamp}] [ERROR] ${statusCode} - ${statusMessage}`);
    
    if(err.stack) {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        error: {
            status: statusCode,
            message: statusMessage,
            timestamp: timestamp,
            ... (process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
}