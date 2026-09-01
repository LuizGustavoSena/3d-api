import type { NextFunction, Request, Response } from 'express';
import { IUserRepository } from '../../data/protocols/repositories/user';
import { UnauthorizedUserError } from '../../domain/errors/user/unauthorized-user.error';

export function privateAdminRouterMiddleware(userRepository: IUserRepository) {
    return async (req: Request, _res: Response, next: NextFunction) => {
        const email = req.user?.email;

        if (!email)
            throw new UnauthorizedUserError();

        const levelAccess = await userRepository.getLevalAccessByEmail(email);

        if (levelAccess !== 2)
            throw new UnauthorizedUserError();

        next();
    };
}
