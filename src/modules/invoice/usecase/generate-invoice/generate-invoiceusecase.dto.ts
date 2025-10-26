
export interface GenarateInvoiceInputDto{
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
        Id?: string
        name: string
        price: number
    }[]; 

}


export interface GenarateInvoiceOutputDto{
    id: string
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string; 
    state: string; 
    zipCode: string;
    items: {
        Id?: string;
        name: string;
        price: number;
    }[];
    total: number; 

}