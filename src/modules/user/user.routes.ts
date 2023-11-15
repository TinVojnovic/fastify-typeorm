import { FastifyInstance } from "fastify";
import { registerUserHandler, getUsersHandler} from './user.controller'
import { server } from "../../app";

async function userRoutes(server: FastifyInstance) {
    server.post('/', registerUserHandler)
    server.get('/getUser', getUsersHandler)
    server.get('/check', async function () {
        return { status: "OK" }
    })
}

export default userRoutes;