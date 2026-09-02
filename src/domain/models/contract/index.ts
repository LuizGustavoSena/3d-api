export interface IContract {
    id: string;
    userId: string;
    files: IContractFile[];
    material: number;
    quantity: number;
    porcentageFilling: number;
    observations?: string;
    status: ContractStatusEnum;
    result?: IContractResult;
}

export interface IContractFile {
    type: string;
    name: string;
    key: string;
}

export enum ContractStatusEnum {
    PENDING = 'PENDING',
    PRINTING = 'PRINTING',
    PRINTED = 'PRINTED',
    DELIVERED = 'DELIVERED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export interface IContractResult {
    materialUsedGrams: number;
    printingTimeSeconds: number;
    value: number;
}