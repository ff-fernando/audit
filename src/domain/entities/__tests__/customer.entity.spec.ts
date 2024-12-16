// import Cpf from 'src/@core/common/domain/value-objects/cpf.vo';
import { Customer } from '../customer.entity';

test('deve criar um customer', () => {
  const customer = Customer.create({
    name: 'John Doe',
    cpf: '486.550.620-90',
  });

  expect(customer.name).toBe('John Doe');

  customer.changeName('John Wick');

  console.dir(customer, { depth: 10 });

  expect(customer.name).toBe('John Wick');
  expect(customer).toBeInstanceOf(Customer);
  expect(customer.id).toBeDefined();
});
