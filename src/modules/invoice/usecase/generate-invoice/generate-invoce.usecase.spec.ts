import GenerateInvoiceUseCase from "./generate-invoce.usecase"

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}


describe("Add Invoice use case unit test", () => {
    it("should add a client", async () => {
        const invoiceRepository = MockRepository()
        const usecase = new GenerateInvoiceUseCase(invoiceRepository)

        const input = {
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
                    name: "Produto X",
                    price: 100.00
                },
                {
                    name: "Produto Y",
                    price: 150.00
                },
            ],
        }

        const result =  await usecase.execute(input)

        expect(invoiceRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined;
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.address.street);
        expect(result.number).toBe(input.address.number);
        expect(result.complement).toBe(input.address.complement);
        expect(result.city).toBe(input.address.city);
        expect(result.state).toBe(input.address.state);
        expect(result.zipCode).toBe(input.address.zipCode);
        expect(result.items.length).toBe(2);
        expect(result.items[0].name).toEqual("Produto X");
        expect(result.items[0].price).toEqual(100.00);
        expect(result.items[1].name).toEqual("Produto Y");
        expect(result.items[1].price).toEqual(150.00);
        expect(result.total).toBe(250.00);
    })
})