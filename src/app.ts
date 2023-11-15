import fastify from 'fastify'
import userRoutes from './modules/user/user.routes'
import { DataSource } from 'typeorm'
import { User } from './modules/entities/User';

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
    logging: true,
    synchronize: true,
    entities: [User]
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


const server = fastify()

server.get('/check', async function () {
    return { status: "OK" }
})


async function main() {

    server.register(userRoutes, { prefix: 'api/users' })

    try {
        let conn = await pool.getConnection();

        await server.listen(3000, '0.0.0.0')
        console.log("radi")

    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

main()