import express from 'express';
import helmet from 'helmet';
import { errorHandler } from './middlewares/error-handler.middleware';
import publicRouters from './routes/public/index.router';
import privateRouters from './routes/private/index.router';

const app = express();

app.use(express.json());
app.use(helmet());

app.use(publicRouters);
app.use(privateRouters);

app.use(errorHandler);

export default app;