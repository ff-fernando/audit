import { ApplicationService } from "../../common/application/application.service";
import { Customer } from "../../domain/entities/customer.entity";
import { ICustomerRepository } from "../../domain/repositories/customer-repository-interface";


export class CustomerService {
    constructor(
        private customerRepo: ICustomerRepository,
        private applicationService: ApplicationService
    ) {}

    list() {
        return this.customerRepo.findAll();
    }

    async create(input: { name: string, cpf: string }) {
        return this.applicationService.run(async () => {
            const customer = Customer.create(input);
            await this.customerRepo.add(customer);
            return customer;
        });
    }

    async changeName(id: string, input: { name: string, cpf: string }) {
        return this.applicationService.run(async () => {
            const customer = await this.customerRepo.findById(id);
            
            if (!customer) {
                throw new Error('Customer not found');
            }

            input.name && customer.changeName(input.name);

            await this.customerRepo.add(customer);
            return customer;
        });
    }
}