import fastify from 'fastify'

const server = fastify()

server.get('/check', async function () {
    return { status: "OK" }
})


async function main() {
    try {
        await server.listen(3000, '0.0.0.0')
        console.log("radi")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

main()