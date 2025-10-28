import { Sequelize, UpdatedAt } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address.value-object";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./invoice-item.model";
import InvoiceRepository from "./invoice.repository";
import Invoice from "../domain/invoice.entity";
import InvoiceItem from "../domain/invoice-item.entity";

describe("InvoiceRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });


  it("should create a invoice", async () => {
    
    const invoiceId = new Id("1")
    const addressVO = new Address({
            street: "Rua 123",
            number: "99",
            complement: "apto 1 bl.1",
            city: "São Paulo",
            state: "SP",
            zipCode: "22222-222",
    })
    const item1 = new InvoiceItem({
      id: new Id("11"),  
      name: "Produto X",
      price: 100.00
    })
    const item2 = new InvoiceItem({
      id: new Id("12"),
      name: "Produto Y",
      price: 150.00
    })

    const invoiceProps = {
        id: invoiceId,
        name: "Cliente Teste",
        document: "1234-5678",
        address: addressVO,
        items: [item1, item2],
    }

    const invoice = new Invoice(invoiceProps);
    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.add(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: invoiceProps.id.id },
      include: [InvoiceItemModel]
    });

    expect(invoiceProps.id.id).toEqual(invoiceDb.id);
    expect(invoiceProps.name).toEqual(invoiceDb.name);
    expect(invoiceProps.document).toEqual(invoiceDb.document);
    expect(addressVO.street).toEqual(invoiceDb.street);
    expect(invoiceDb.items.length).toBe(2);

  });


  it("should find a invoice by id", async () => {
    
    const invoiceRepository = new InvoiceRepository();
    
    const formatDate = (date: Date ): Date => {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
             date.getHours(), date.getMinutes(), date.getSeconds(), 0);
    };
    
    const createdAtFormated = formatDate(new Date());
    const updatedAtFormated = formatDate(new Date());


    await InvoiceModel.create({
      id: "2",
      name: "Cliente Teste",
      document: "1234-5678",
      street: "Rua 123",
      number: "99",
      complement: "apto 1 bl.1",
      city: "São Paulo",
      state: "SP",
      zipCode: "22222-222",
      createdAt: createdAtFormated,
      updatedAt:  updatedAtFormated,
      items: [
        { id: "111",
          name: "Produto X",
          price: 100.00,
          
        },
        {id: "112",
          name: "Produto Y",
          price: 150.00,
          
        },
      ],
    },{ include: [InvoiceItemModel]}
  )

    const invoiceResult = await invoiceRepository.find("2");

    const receivedCreatedAt = formatDate(invoiceResult.createdAt).getTime();
    const expectedCreatedAtTime = createdAtFormated.getTime();
    const receivedUpdatedAt = formatDate(invoiceResult.updatedAt).getTime();
    const expectedUpdatedAtTime = updatedAtFormated.getTime();
 

    expect(invoiceResult.id.id).toEqual("2");
    expect(invoiceResult.name).toEqual("Cliente Teste");
    expect(invoiceResult.document).toEqual("1234-5678");
    expect(invoiceResult.total).toEqual(250.00);
    expect(invoiceResult.address).toBeInstanceOf(Address);
    expect(invoiceResult.address.street).toEqual("Rua 123");
    expect(invoiceResult.items.length).toEqual(2);
    expect(invoiceResult.items[0].id.id).toBe("111");
    expect(invoiceResult.items[0].name).toBe("Produto X");
    expect(invoiceResult.items[0].price).toBe(100.00);
    expect(invoiceResult.items[1].id.id).toBe("112");
    expect(invoiceResult.items[1].name).toBe("Produto Y");
    expect(invoiceResult.items[1].price).toBe(150.00);
    expect(receivedCreatedAt).toEqual(expectedCreatedAtTime);
    expect(receivedUpdatedAt).toEqual(expectedUpdatedAtTime);
  })

    

})