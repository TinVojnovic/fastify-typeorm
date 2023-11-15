import { FastifyInstance } from "fastify";
import { createProductHandler, getProductsHandler } from "./product.controller";


async function productRoutes(server: FastifyInstance) {
    server.post('/createProduct', createProductHandler)

    server.get('/fetchProducts', getProductsHandler)
}

export default productRoutes;