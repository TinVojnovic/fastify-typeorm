import { FastifyInstance } from "fastify";
import { createAdressHandler, getAdressHandler } from "./adress.controller";

async function adressRoutes(server: FastifyInstance) {
    server.post('/createAdress', createAdressHandler)

    server.get('/fetchAdresses', getAdressHandler)
}

export default adressRoutes;