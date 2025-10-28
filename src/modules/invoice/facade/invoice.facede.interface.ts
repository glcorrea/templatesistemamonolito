
export interface GenerateInvoiceFacadeInputDto{
    id?: string
    name: string
    document: string
    address: {
        street: string
        number: string
        complement: string
        city: string 
        state: string 
        zipCode: string
    }
    items: {
        id?: string
        name: string
        price: number
    }[]; 

}


export interface FindInvoiceFacadeCaseInputDto {
  id: string
}

export interface FindInvoiceFacadeCaseOutputDto {
    id: string
    name: string
    document: string
    address: {
        street: string
        number: string
        complement: string
        city: string 
        state: string
        zipCode: string
    }
    items: {
        id: string
        name: string
        price: number
    }[];
    total: number
    createdAt: Date
    updatedAt: Date
}


export default interface InvoiceFacadeInterface{
    add(input: GenerateInvoiceFacadeInputDto): Promise<void>;
    find(input: FindInvoiceFacadeCaseInputDto): Promise<FindInvoiceFacadeCaseOutputDto>;
}