export interface RequestLoginUser {
    email: string;
    password: string;
}

export interface ResponseLoginUser {
    accessToken: string;
    refreshToken: string;
}