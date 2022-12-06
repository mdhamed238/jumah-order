import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './database/database';
import productRouter from './routes/product';
import userRouter from './routes/user';

dotenv.config();

const app = express();

const port = process.env.PORT || 4545;


// connect to database
connectDatabase();

// Middleware
app.use(cors());
app.use(express.json());




// Home page
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Mount routers
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
    


// Listen for requests on port 4545
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

