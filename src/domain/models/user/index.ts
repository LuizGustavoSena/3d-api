export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    birthdate: Date;
    refreshtoken?: string;
}