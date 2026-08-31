import type { NextFunction, Request, Response } from 'express';
import { IJwt } from '../../data/protocols/jwt';
import { InvalidTokenError } from '../../domain/errors/user/invalid-token.error';

export function authMiddleware(jwt: IJwt) {
    return (req: Request, _res: Response, next: NextFunction) => {
        const authorization = req.headers.authorization;

        if (!authorization)
            throw new InvalidTokenError();

        const [scheme, token] = authorization.split(' ');

        if (scheme !== 'Bearer' || !token)
            throw new InvalidTokenError();

        const decoded = jwt.validate(token);

        if (!decoded)
            throw new InvalidTokenError();

        req.user = { email: decoded.email };

        next();
    };
}
