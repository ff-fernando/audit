import EventEmitter2 from 'eventemitter2';
import { AggregateRoot } from './aggregate-root';

export class DomainEventManager {
  domainEventsSubscriber: EventEmitter2;

  constructor() {
    this.domainEventsSubscriber = new EventEmitter2({
      wildcard: true,
    });
  }

  register(event: string, handler: any) {
    this.domainEventsSubscriber.on(event, handler);
  }

  async publish(aggregateRoot: AggregateRoot) {
    for (const event of aggregateRoot.events) {
      const eventClassName = event.constructor.name;
      await this.domainEventsSubscriber.emitAsync(eventClassName, event);
    }
    aggregateRoot.clearEvents();
  }
}
