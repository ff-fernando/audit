import { FastifyInstance } from "fastify";
import { getCustomersHandler, createCustomerHandler, changeNameCustomerHandler } from "./customer.controller";

async function customerRoutes(fastify: FastifyInstance) {
  fastify.post('/', createCustomerHandler);
  fastify.put('/:id', changeNameCustomerHandler);
  fastify.get('/', getCustomersHandler);
}

export default customerRoutes;