import { Customer } from "../domain/entities/customer.entity";
import { ICustomerRepository } from "../domain/repositories/customer-repository-interface";


export class CustomerRepository implements ICustomerRepository {
    customers: Set<Customer> = new Set<Customer>();
    
    add(entity: Customer): Promise<void> {
        this.customers.add(entity);
        return Promise.resolve();
    }

    findById(id: any): Promise<Customer | null> {
        for (const customer of this.customers) {
            if (customer.id.value === id) {
                return Promise.resolve(customer);
            }
        }
        return Promise.resolve(null);
    }

    findAll(): Promise<Customer[]> {
        return Promise.resolve(Array.from(this.customers));
    }

    delete(entity: Customer): Promise<void> {
        this.customers.delete(entity);
        return Promise.resolve();
    }
    
    async save(customer: Customer): Promise<void> {
        return Promise.resolve();
    }
}