export interface IUsecase<P, R> {
    execute(params: P): Promise<R>;
}