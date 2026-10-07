import { IStorage, SetItemProps } from "../../../src/data/protocols/storage";

export class StorageMock implements IStorage {
    setItem = vi.fn<[SetItemProps], Promise<string>>();

    getUrlByKey = vi.fn<[string], Promise<string>>();
}
