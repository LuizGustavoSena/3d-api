import { IContract } from "../../models/contract";

export interface RequestCreateContract extends Omit<IContract, 'id' | 'result' | 'status' | 'files'> {
    files: {
        type: string;
        name: string;
        file: Buffer;
    }[];
}

export interface ResponseCreateContract {
    id: string;
}
