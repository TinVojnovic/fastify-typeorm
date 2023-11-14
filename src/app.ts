import fastify from 'fastify'
import userRoutes from './modules/user/user.routes'
import { DataSource } from 'typeorm'



const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'test'
});

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