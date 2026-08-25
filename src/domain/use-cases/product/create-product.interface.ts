export interface RequestCreateProduct {
    material: number;
    name: string;
    printingTime: number;
    value: number;
    image: Buffer;
}

export interface ResponseCreateProduct {
    id: string;
}