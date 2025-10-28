import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./invoice-item.model";
import Address from "../../@shared/domain/value-object/address.value-object";
import InvoiceItem from "../domain/invoice-item.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

export default class InvoiceRepository implements InvoiceGateway {
  async add(invoice: Invoice): Promise<void> {
    await InvoiceModel.create({
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
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt,
    },{
        include: [{model: InvoiceItemModel}]
    });
  }

  async find(id: string): Promise<Invoice> {
    const invoiceModel = await InvoiceModel.findOne({
      where: { id },
      include: [{
        model: InvoiceItemModel,
        required: true,
      }],
      rejectOnEmpty: true,
    });

    const address = new Address({
        street: invoiceModel.street,
        number: invoiceModel.number,
        complement: invoiceModel.complement,
        city: invoiceModel.city,
        state: invoiceModel.state,
        zipCode: invoiceModel.zipCode, 
    })

    const items = invoiceModel.items.map(itemModel => new InvoiceItem({
        id: itemModel.id ? new Id(itemModel.id) : new Id(),
        name: itemModel.name,
        price: itemModel.price,
    }))

    const invoice = new Invoice({
        id: invoiceModel.id ? new Id(invoiceModel.id) : new Id(),
        name: invoiceModel.name,  
        document: invoiceModel.document,
        address: address,   
        items: items,
    })

    if (!invoice) {
      throw new Error(`Invoice with id ${id} not found`);
    }

    return invoice;



  }
}