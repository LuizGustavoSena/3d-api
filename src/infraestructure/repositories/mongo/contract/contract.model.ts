import { Schema, model } from "mongoose";
import { IContract, IContractFile, IContractResult, ContractStatusEnum } from "../../../../domain/models/contract";

const contractFileSchema = new Schema<IContractFile>({
    type: { type: String, required: true },
    name: { type: String, required: true },
    key: { type: String, required: true },
}, { _id: false });

const contractResultSchema = new Schema<IContractResult>({
    materialUsedGrams: { type: Number, required: true },
    printingTimeSeconds: { type: Number, required: true },
    value: { type: Number, required: true },
}, { _id: false });

const contractSchema = new Schema<IContract>({
    id: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    files: { type: [contractFileSchema], required: true },
    material: { type: Number, required: true },
    quantity: { type: Number, required: true },
    porcentageFilling: { type: Number, required: true },
    observations: { type: String, required: false },
    status: { 
        type: String, 
        enum: Object.values(ContractStatusEnum), 
        required: true, 
        default: ContractStatusEnum.PENDING 
    },
    result: { type: contractResultSchema, required: false },
}, { 
    timestamps: true,
    toJSON: {
        transform: (_, ret: Record<string, any>) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

export const ContractModel = model<IContract>("Contract", contractSchema);
