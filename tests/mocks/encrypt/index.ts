import { vi } from 'vitest';
import { IEncrypt } from "../../../src/data/protocols/encrypt";

export class EncryptMock implements IEncrypt {
    encrypt = vi.fn<[string], string>();
    decrypt = vi.fn<[string], string>();
}
