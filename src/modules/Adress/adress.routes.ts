import { FastifyInstance } from "fastify";
import { addAdress, getAdressHandler } from "./adress.controller";

async function adressRoutes(server: FastifyInstance) {
    server.post('/addAdress', addAdress)
    server.get('/fetchAdresses', getAdressHandler)
}

export default adressRoutes;