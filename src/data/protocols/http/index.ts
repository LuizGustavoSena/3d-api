export interface IHttpResponse {
    data?: any,
    statusCode: StatusCodeEnum
}

export enum StatusCodeEnum {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    FORBIDDEN = 403,
    PRECONDITION_FAILED = 412,
    SERVER_ERROR = 500
}