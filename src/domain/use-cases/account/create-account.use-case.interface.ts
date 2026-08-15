export interface RequestCreateUser {
    username: string;
    email: string;
    password: string;
    birthdate: Date;
}

export interface ResponseCreateUser {
    id: string;
}