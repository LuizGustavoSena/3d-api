export interface SetItemProps {
    file: Buffer,
    key: string,
    contentType: string,
}

export interface IStorage {
    setItem(params: SetItemProps): Promise<string>;
}