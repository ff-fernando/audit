import { FastifyReply, FastifyRequest } from "fastify";
import { CustomerService } from "./customer.service";
import { CustomerRepository } from "../../repositories/customer-repository";
import { ApplicationService } from "../../common/application/application.service";
import { UnitOfWork } from "../../common/infra/unit-of-work";
import { DomainEventManager } from "../../common/domain/domain-event-manager";
import { CustomerCreatedHandler } from "../handlers/customer.handler";
import { IDomainEvent } from "../../common/domain/domain-event-interface";

const customerRepo = new CustomerRepository();
const uow = new UnitOfWork();
const domainEventManager = new DomainEventManager();
const applicationService = new ApplicationService(uow, domainEventManager);
const customerService = new CustomerService(customerRepo, applicationService);

export async function createCustomerHandler(request: FastifyRequest<{
    Body: {
        name: string;
        cpf: string;
    }
}>, reply: FastifyReply) {

    try {
        const customer = await customerService.create(request.body);
        reply.code(201);
        return customer;
    } catch (error) {
        reply.code(500);
        return error;
    }
}

export async function changeNameCustomerHandler(request: FastifyRequest<{
    Body: {
        name: string;
        cpf: string;
    },
    Params: {
        id: string;
    }
}>, reply: FastifyReply) {
    try {
        const customer = await customerService.changeName(request.params.id, request.body);
        reply.code(200);
        return customer;
    } catch (error) {
        reply.code(500);
        return error;
    }
}


export async function getCustomersHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const customers = await customerService.list();
        reply.code(200);
        return customers;
    } catch (error) {
        reply.code(500);
        return error;
    }
}

const customerCreatedHandler = new CustomerCreatedHandler();
domainEventManager.register('*', async (event: IDomainEvent) => {
    customerCreatedHandler.handle(event);
});
