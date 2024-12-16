import { IDomainEvent } from './domain-event-interface';
import { Entity } from './entity';

export abstract class AggregateRoot extends Entity {
  events: Set<IDomainEvent> = new Set<IDomainEvent>();

  addEvent(event: IDomainEvent) {
    this.events.add(event);
  }

  clearEvents() {
    this.events.clear();
  }
}
