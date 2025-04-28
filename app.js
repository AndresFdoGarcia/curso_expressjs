import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.routes.js';
import { loggerMiddleware } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { setupSwagger } from './config/swagger.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const userFilePath = join(__dirname, 'data', 'users.json');

// Initialize express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use(errorHandler);

// Setup Swagger
setupSwagger(app);

// Rutas
app.use('/', userRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});