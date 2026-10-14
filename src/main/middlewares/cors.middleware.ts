import cors from 'cors';
import { env } from '../../infraestructure/validations/zod/env';

export const corsMiddleware = () => {
    if (env.NODE_ENV === 'dev') {
        return cors({ origin: '*' });
    }

    return cors({ origin: env.URL_APPLY_CORS });
};
