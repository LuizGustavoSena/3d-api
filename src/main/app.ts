import express from 'express';
import helmet from 'helmet';
import { errorHandler } from './middlewares/error-handler.middleware';
import publicRouters from './routes/public/index.router';

const app = express();

app.use(express.json());
app.use(helmet());

app.use(publicRouters);

app.use(errorHandler);

export default app;