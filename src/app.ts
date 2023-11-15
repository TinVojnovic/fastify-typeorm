import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import userRoutes from './modules/user/user.routes'
import { DataSource } from 'typeorm'
import { User } from './modules/entities/User';
import { Product } from './modules/entities/Product';
import fastifyJwt, { JWT } from '@fastify/jwt';
import productRoutes from './modules/product/product.routes';
import { Adress } from './modules/entities/Adress';

//TODO Make environment variables 

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'test'
});

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123",
    database: "test",
    synchronize: true,
    entities: [User, Product, Adress]
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


export const server = fastify()

server.decorate("auth", async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        await req.jwtVerify()
    } catch (err) {
        return rep.send(err)
    }
})

server.register(fastifyJwt, {
    secret: "psstOvoJeTajna"
})

//This doesn't seem to work for some reason.. tried different approaches. Don't know what I'm missing
server.addHook('preHandler', (req, res, next) => {
    req.jwt = server.jwt
    return next()
})

server.register(userRoutes, { prefix: 'api/users' })
server.register(productRoutes, { prefix: 'api/products' })


declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any
    }

    export interface FastifyRequest {
        jwt: JWT
    }
}

async function main() {


    try {
        await server.listen({ port: 3000, host: '127.0.0.1' })

        await server.ready()
        console.log("Server running on PORT:3000")

    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}


main()