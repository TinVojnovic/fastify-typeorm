import { FastifyReply, FastifyRequest } from "fastify";
import { Product } from "../entities/Product";

interface CreateProductBody {
    title: string,
    price: number,
}

//TODO Add error handling

export async function createProductHandler(req: FastifyRequest, reply: FastifyReply) {
    const { title, price } = <CreateProductBody>req.body;

    const product = Product.create({
        title: title,
        price: price
    })


    await product.save()
    return reply.send(product)
}

export async function getProductsHandler(req: FastifyRequest, reply: FastifyReply) {
   const products = await Product.find({
        select: {
            title: true,
            price: true,
            created_at: true,
            updated_at: true
        },
    })

    return reply.send(products)
}