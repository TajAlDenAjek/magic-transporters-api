import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import router from './routes';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
import notFound from './utils/notFound';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use(errorHandlerMiddleware)
app.use(notFound)


const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} ...`);
    });
});