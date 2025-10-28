import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, {
    GenerateInvoiceFacadeInputDto,
    FindInvoiceFacadeCaseInputDto,
    FindInvoiceFacadeCaseOutputDto,
} from "./invoice.facede.interface"

export interface UseCaseProps {
  findInvoiceUseCase: UseCaseInterface;
  generateInvoiceUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface{
    private _findUseInvoiceCase: UseCaseInterface;
    private _generateInvoiceUseCase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._findUseInvoiceCase = usecaseProps.findInvoiceUseCase;
        this._generateInvoiceUseCase= usecaseProps.generateInvoiceUseCase;
    }

    async add(input: GenerateInvoiceFacadeInputDto): Promise<void> {
        await this._generateInvoiceUseCase.execute(input);
    }

    async find(input: FindInvoiceFacadeCaseInputDto): Promise<FindInvoiceFacadeCaseOutputDto> {
        return await this._findUseInvoiceCase.execute(input);
    }

}