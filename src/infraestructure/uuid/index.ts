import { v4 as uuidv4 } from 'uuid';
import { IUuid } from '../../data/protocols/uuid';

export class Uuid implements IUuid {
    constructor() { };

    generate = (): string => {
        return uuidv4();
    }
}