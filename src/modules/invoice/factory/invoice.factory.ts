import InvoiceRepository from "../repository/invoice.repository";
import GenarateInvoiceUseCase from "../usecase/generate-invoice/generate-invoce.usecase";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoiceusecase"
import InvoiceFacade, { UseCaseProps } from "../facade/invoice.facade";


export default class InvoiceFactory {
    static create(){
        const invoiceRepository = new InvoiceRepository();
        const generateInvoiceUseCase = new GenarateInvoiceUseCase(invoiceRepository);
        const findUseCase = new FindInvoiceUseCase(invoiceRepository);
        const facade = new InvoiceFacade ({
            generateInvoiceUseCase: generateInvoiceUseCase,
            findInvoiceUseCase: findUseCase,
        });

        return facade;

    }
}