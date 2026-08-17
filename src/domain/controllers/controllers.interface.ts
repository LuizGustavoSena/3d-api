import { type Request, type Response, type NextFunction} from 'express';

export interface IController {
    handle(req: Request, res: Response, next?: NextFunction): Promise<Response>;
}