import express from 'express';
import helmet from 'helmet';
import PublicUserRouter from './routes/public/user/index.router';
import { errorHandler } from './middlewares/error-handler.middleware';

const app = express();

app.use(express.json());
app.use(helmet());

app.use(PublicUserRouter);

app.use(errorHandler);

export default app;