import { FastifyReply, FastifyRequest } from "fastify";
import { Product } from "../entities/Product";
import { Adress, AdressType } from "../entities/Adress";

interface CreateAdressBody {
    adress: string,
    type: AdressType,
    userId: number
}

//TODO Add error handling

export async function createAdressHandler(req: FastifyRequest, reply: FastifyReply) {
    const { adress, type } = <CreateAdressBody>req.body;

    const newAdress = Adress.create({
        adress: adress,
        type: type
    })


    await newAdress.save()
    return reply.send(adress)
}

export async function getAdressHandler(req: FastifyRequest, reply: FastifyReply) {
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