import { IUnitOfWork } from "../application/unit-of-work.interface";

export class UnitOfWork implements IUnitOfWork {
    beginTransaction(): Promise<void> {
        // console.log('Starting transaction');
        return Promise.resolve();
    }
    
    commit(): Promise<void> {
        // console.log('Committing transaction');
        return Promise.resolve();
    }
    rollback(): Promise<void> {
        // console.log('Rolling back transaction');
        return Promise.resolve();
    }
}