import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './database/database';
import productRouter from './routes/product';
import userRouter from './routes/user';
import logger from './log/logger';
import helmet from 'helmet';
import compression from 'compression';
import { errorHandler, notFound } from './errors/errors-handler';

dotenv.config();

const app = express();

const port = process.env.PORT || 4545;


// connect to database
connectDatabase();

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());


// Home page
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Mount routers
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
    


// Handle 404 errors
app.use(notFound);

// Handle errors
app.use(errorHandler);

// Listen for requests on port 4545
app.listen(port, () => {
    logger.info
        (`Server started on port ${port}`);
});

