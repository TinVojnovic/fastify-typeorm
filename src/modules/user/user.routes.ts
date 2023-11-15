import { FastifyInstance } from "fastify";
import { registerUserHandler, getUsersHandler, loginHandler, addProduct } from './user.controller'
import { server as fastifyServer } from "../../app";

async function userRoutes(server: FastifyInstance) {
    server.post('/registerUser', registerUserHandler)
    server.post('/login', loginHandler)
    server.post('/addProduct', addProduct)


    //This method of setting up hooks seems to be depricated or something. It should work as { onRequest: [fastifyServer.authenticate] } 
    // or { preHandler: [fastifyServer.authenticate] }
    //but it throws an error saying that the hook should be a function. Does not line up with the documentation.
    //TODO: find a way to fix this
    server.get('/fetchUsers', { preHandler: fastifyServer.authenticate }, getUsersHandler)
}

export default userRoutes;