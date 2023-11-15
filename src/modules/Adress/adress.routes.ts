import { FastifyInstance } from "fastify";
import { addAdress, addProduct, getAdressHandler } from "./adress.controller";

async function adressRoutes(server: FastifyInstance) {
    server.post('/addAdress', addAdress)
    server.get('/fetchAdresses', getAdressHandler)
    server.post('/addProduct', addProduct)
}

export default adressRoutes;