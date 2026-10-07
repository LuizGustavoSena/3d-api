export interface ResponseFindAllProducts {
    id: string;
    material: number;
    name: string;
    printingTime: number;
    value: number;
    imageUrl: string;
}

export interface GetALlProductParams {
    limit: number;
    page: number;
}
