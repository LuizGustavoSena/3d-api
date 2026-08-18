import { CryptoEncrypt } from "../../../infraestructure/encrypt/crypt";

export function factoryEncrypt() {
    return new CryptoEncrypt();
}