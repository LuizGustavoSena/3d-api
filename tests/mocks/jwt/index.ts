import { vi } from 'vitest';
import { IJwt, RequestToken, ResponseToken, ResponseValidate } from "../../../src/data/protocols/jwt";

export class JwtMock implements IJwt {
    generate = vi.fn<[RequestToken], ResponseToken>();
    validate = vi.fn<[string], ResponseValidate>();
}
