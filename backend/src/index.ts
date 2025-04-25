import 'reflect-metadata'
import express from 'express';
import { validateEnv } from './config/envConfig';
import { connectToMongo } from './utils/connectMongo';
import userRouter from './route/UserRoutes';
import FeedbackRoutes from './route/FeedbackRoutes';
import morgan from 'morgan'
import cors from "cors"

const app = express();
const port = 3000;

validateEnv()
connectToMongo()
// Middleware to parse JSON
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use('/user', userRouter)
app.use('/feedback', FeedbackRoutes)
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
