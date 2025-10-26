import Address from "../../../@shared/domain/value-object/address.value-object"
import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice.entity"
import InvoiceItem from "../../domain/invoice-item.entity"
import InvoiceGateway from "../../gateway/invoice.gateway"
import { GenerateInvoiceInputDto, GenerateInvoiceOutputDto } from "./generate-invoiceusecase.dto"

export default class GenerateInvoiceUseCase {

    private _invoiceRepository: InvoiceGateway

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository
    }

    async execute(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto> {

        
        const address = new Address({
            street: input.address.street,
            number: input.address.number,
            complement: input.address.complement,
            city: input.address.city,
            state: input.address.state,
            zipCode: input.address.zipCode,
        })
    
        const items =   input.items.map(item => new InvoiceItem({
            id: item.id ? new Id(item.id) : new Id(),
            name: item.name,
            price: item.price
        }))
        
        const invoice = new Invoice({
            id: input.id ? new Id(input.id) : new Id(),
            name: input.name,  
            document: input.document,
            address: address,   
            items: items,
        })
        
        await this._invoiceRepository.add(invoice)

        return{
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            total: invoice.total,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        }

    } 

}