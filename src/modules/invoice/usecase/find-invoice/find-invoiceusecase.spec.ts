import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoiceusecase";

const invoiceItem1 = new InvoiceItem({
    id: new Id("11"),
    name: "Produto X",
    price: 100.00
})

const invoiceItem2 = new InvoiceItem({
    id: new Id("12"),
    name: "r",
    price: 150.00
})


const invoiceAddress = new Address({
    street: "Rua 123",
    number: "99",
    complement: "apto 1 bl.1",
    city: "São Paulo",
    state: "SP",
    zipCode: "22222-222",
})

const mockInvoice
 = new Invoice({
    id: new Id("1"),
    name: "Cliente Teste",
    document: "1234-5678",
    address: invoiceAddress,
    items: [invoiceItem1, invoiceItem2],

});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(mockInvoice))};
};

describe("find a invoice usecase unit test", () => {
  it("should find a product", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new FindInvoiceUseCase(invoiceRepository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(invoiceRepository.find).toHaveBeenCalledWith(input.id);
    expect(result.id).toBe("1");
    expect(result.name).toBe(mockInvoice.name);
    expect(result.document).toBe(mockInvoice.document);
    expect(result.total).toBe(250.00);
    expect(result.Address.street).toBe(invoiceAddress.street);
    expect(result.Address.city).toBe(invoiceAddress.city);
    expect(result.Address.state).toBe(invoiceAddress.state);
    expect(result.Address.zipCode).toBe(invoiceAddress.zipCode);
    expect(result.items.length).toBe(2);
    expect(result.items[0].Id).toBe("11");
    expect(result.items[0].name).toBe(invoiceItem1.name);
    expect(result.items[0].price).toBe(invoiceItem1.price);
    expect(result.items[1].Id).toBe("12");
    expect(result.items[1].name).toBe(invoiceItem2.name);
    expect(result.items[1].price).toBe(invoiceItem2.price);
    
  });
});