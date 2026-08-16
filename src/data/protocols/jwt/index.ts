export interface IJwt {
    generate(params: RequestToken): ResponseToken;
    validate(token: string): ResponseValidate;
}

export interface RequestToken {
    email: string;
}

export interface ResponseToken {
    token: string;
}

export interface ResponseValidate {
    email: string;
    issued: number;
    expires: number;
}