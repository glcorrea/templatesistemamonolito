import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";


type InvoiceProps = {
    id?: Id // criado automaticamente
    name: string
    document: string
    address: Address // value object
    items: InvoiceItems[] // Invoice Items entity
    createdAt?: Date // criada automaticamente
    updatedAt?: Date // criada automaticamente

}