import Address from "../../../@shared/domain/value-object/address.value-object"
import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice.entity"
import InvoiceGateway from "../../gateway/invoice.gateway"
import { GenarateInvoiceInputDto } from "./generate-invoiceusecase.dto"

export default class GenarateInvoceUseCase {

    private _invoiceRepository: InvoiceGateway

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository
    }

    async execute(input: GenarateInvoiceInputDto): Promise<GenarateInvoiceOutputDto> {

        
        const address = new Address({
            street: input.address.street,
            number: input.address.number,
            complement: input.address.complement,
            city: input.address.city,
            state: input.address.state,
            zipCode: input.address.zipCode,
        })
    
        const items =   input.items.map(item => new InvoiceItem({

        })
        const propos = {
            id: new Id(input.id) || new Id(),
            name: input.name,  
            document: input.document,
            

        }
        
        

    } 

}