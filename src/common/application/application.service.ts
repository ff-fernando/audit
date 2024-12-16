import { AggregateRoot } from '../domain/aggregate-root';
import { DomainEventManager } from '../domain/domain-event-manager';
import { IUnitOfWork } from './unit-of-work.interface';

export class ApplicationService {
  constructor(
    private uow: IUnitOfWork,
    private domainEventManager: DomainEventManager,
  ) {}

  start() {
    this.uow.beginTransaction();
    console.log('Starting transaction');
  }

  async finish(aggregateRoot: AggregateRoot) {
    await this.uow.commit();
    await this.domainEventManager.publish(aggregateRoot);
  }

  fail() {
    console.log('Rolling back transaction');
    this.uow.rollback();
  }

  async run<T>(callback: () => Promise<T>): Promise<T> {
    await this.start();
    try {
      const result = await callback();
      await this.finish(result as AggregateRoot);
      return result;
    } catch (e) {
      await this.fail();
      throw e;
    }
  }
}