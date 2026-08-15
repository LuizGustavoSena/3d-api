export interface IEncrypt {
    encrypt(data: string): string;
    decrypt(data: string): string;
}