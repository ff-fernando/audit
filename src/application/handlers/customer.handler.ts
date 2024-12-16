import { IDomainEventHandler } from "../../common/application/domain-event-handler.interface";
import { IDomainEvent } from "../../common/domain/domain-event-interface";

export class CustomerCreatedHandler implements IDomainEventHandler {
    async handle(event: IDomainEvent): Promise<void> {
        // enviar para uma fila, salvar no banco...
        console.dir(event, { depth: 10 });
    }
}