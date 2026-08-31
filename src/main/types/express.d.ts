import { IJwt } from '../../data/protocols/jwt';

declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string;
            };
        }
    }
}

export {};
