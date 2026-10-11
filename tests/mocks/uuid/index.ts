import { vi } from 'vitest';
import { IUuid } from '../../../src/data/protocols/uuid';

export class UuidMock implements IUuid {
    generate = vi.fn<[], string>();
}
