import { Sequelize } from "sequelize-typescript";
import Address from "../../@shared/domain/value-object/address.value-object";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemModel } from "../repository/invoice-item.model";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoce.usecase"
import InvoiceFacade from "./invoice.facade";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoiceusecase";
import { GenerateInvoiceFacadeInputDto, FindInvoiceFacadeCaseInputDto } from "./invoice.facede.interface";
import InvoiceFacadeFactory from "../factory/invoice.factory";    



describe("Invoice Facade test", () => {
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
    
    const repository = new InvoiceRepository();
    //const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
    //const facade = new InvoiceFacade({
       //generateInvoiceUseCase: generateInvoiceUseCase                            ,
       //findInvoiceUseCase: undefined
   // })
    const facade = InvoiceFacadeFactory.create();

    const input = {
        id: "1",
        name: "Cliente Teste",
        document: "1234-5678",
        address: {
            street: "Rua 123",
            number: "99",
            complement: "apto 1 bl.1",
            city: "São Paulo",
            state: "SP",
            zipCode: "22222-222",
        },
        items: [
            {
                id: "111",  
                name: "Produto X",
                price: 100.00
            },
            {
                id: "112",
                name: "Produto Y",
                price: 150.00
            }
        ]
    }
    
    await facade.add(input);

    
    const invoiceDB = await InvoiceModel.findOne({
       where: { id: "1" },
      include: [InvoiceItemModel]
    });

    expect(input.id).toEqual(invoiceDB.id);
    expect(input.name).toEqual(invoiceDB.name);
    expect(input.document).toEqual(invoiceDB.document);
    expect(input.address.street).toEqual(invoiceDB.street);
    expect(input.items.length).toBe(2);

  });

  it("should find a invoice by id", async () => {
      
        //const repository = new InvoiceRepository();
        //const findUseCase = new FindInvoiceUseCase(repository);
        //const facade = new InvoiceFacade({
           // generateInvoiceUseCase: undefined                           ,
           // findInvoiceUseCase: findUseCase
        //})
        const facade = InvoiceFacadeFactory.create();
      
        const formatDate = (date: Date ): Date => {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
               date.getHours(), date.getMinutes(), date.getSeconds(), 0);
        };
      
        const createdAtFormated = formatDate(new Date());
        const updatedAtFormated = formatDate(new Date());
  
  
        const input = {
        id: "1",
        name: "Cliente Teste",
        document: "1234-5678",
        address: {
            street: "Rua 123",
            number: "99",
            complement: "apto 1 bl.1",
            city: "São Paulo",
            state: "SP",
            zipCode: "22222-222",
        },
        items: [
            {
                id: "111",  
                name: "Produto X",
                price: 100.00
            },
            {
                id: "112",
                name: "Produto Y",
                price: 150.00
            }
            ]
        }
    
        await facade.add(input);
  
        
        const invoiceResult = await facade.find({ id: "1" });
    
        const receivedCreatedAt = formatDate(invoiceResult.createdAt).getTime();
        const expectedCreatedAtTime = createdAtFormated.getTime();
        const receivedUpdatedAt = formatDate(invoiceResult.updatedAt).getTime();
        const expectedUpdatedAtTime = updatedAtFormated.getTime();
    
    
        expect(invoiceResult.id).toEqual("1");
        expect(invoiceResult.name).toEqual("Cliente Teste");
        expect(invoiceResult.document).toEqual("1234-5678");
        expect(invoiceResult.total).toEqual(250.00);
        //expect(invoiceResult.address).toBeInstanceOf(Address);
        expect(invoiceResult.address.street).toEqual("Rua 123");
        expect(invoiceResult.items.length).toEqual(2);
        expect(invoiceResult.items[0].id).toBe("111");
        expect(invoiceResult.items[0].name).toBe("Produto X");
        expect(invoiceResult.items[0].price).toBe(100.00);
        expect(invoiceResult.items[1].id).toBe("112");
        expect(invoiceResult.items[1].name).toBe("Produto Y");
        expect(invoiceResult.items[1].price).toBe(150.00);
        expect(receivedCreatedAt).toEqual(expectedCreatedAtTime);
        expect(receivedUpdatedAt).toEqual(expectedUpdatedAtTime);
    })

   

})