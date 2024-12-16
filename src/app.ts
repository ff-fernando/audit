import Fastify from 'fastify'
import customerRoutes from './application/customer/customer.route';

const fastify = Fastify();

async function main() {
  fastify.register(customerRoutes, {prefix: 'customer'});

  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log('Server listening at http://localhost:3000');  
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();