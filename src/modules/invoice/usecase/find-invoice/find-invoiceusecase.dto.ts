
export interface FindInvoiceUseCaseInputDto {
  id: string
}

export interface FindInvoiceUseCaseOutputDto {
    id: string
    name: string
    document: string
    Address: {
        street: string
        number: string
        complement: string
        city: string 
        state: string
        zipCode: string
    }
    items: {
        Id: string
        name: string
        price: number
    }[];
    total: number
    createdAt: Date
    updatedAt: Date
}