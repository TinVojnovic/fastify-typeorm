import fastify from 'fastify'
import userRoutes from './modules/user/user.routes'
import { DataSource } from 'typeorm'
import { User } from './modules/entities/User';
import { Product } from './modules/entities/Product';

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'test'
});

const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123",
    database: "test",
    synchronize: true,
    entities: [User, Product]
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


export const server = fastify()

server.get('/check', async function () {
    return { status: "OK" }
})

server.register(userRoutes, { prefix: 'api/users' })

async function main() {


    try {
        await server.listen({ port: 3000, host: '127.0.0.1' })

        await server.ready()
        console.log("radi")

    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}


main()