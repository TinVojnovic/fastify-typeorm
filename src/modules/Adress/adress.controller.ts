import { FastifyReply, FastifyRequest } from "fastify";
import { Adress, AdressType } from "../entities/Adress";
import { AppDataSource } from "../../app";
import { User } from "../entities/User";
import { Product } from "../entities/Product";

//TODO Add error handling

interface addAdressBody{
    adress: string,
    type: AdressType,
    userId: number
}

interface addProductBody {
    productId: number,
    adressId: number
}

//I'd fetch userID from the token if it worked....

export async function addAdress(req: FastifyRequest, reply: FastifyReply) {
    const { adress, type, userId } = <addAdressBody>req.body;

    const userRepo = AppDataSource.getRepository(User)

    const user = userRepo.findOne({
        where: {
            id: userId
        }
    })

    const newAdress = Adress.create({
        adress: adress,
        type: type,
        user: (await user)
    })


    await newAdress.save()
    return reply.send({adress, user})
}

export async function getAdressHandler(req: FastifyRequest, reply: FastifyReply) {
    const adresses = await Adress.find({
        select: {
            adress: true,
            type: true,
            user: true //this is giving an error for some reason??? but it works
        },
    })

    return reply.send(adresses)
}

export async function addProduct(req: FastifyRequest, reply: FastifyReply) {
    const { productId, adressId } = <addProductBody>req.body;

    const adressRepo = AppDataSource.getRepository(Adress)
    const productRepo = AppDataSource.getRepository(Product)

    const product = productRepo.findOne({
        where: {
            id: productId,
        },
    });

    const adress = adressRepo.findOne({
        where: {
            id: adressId,
        },
        relations: {
            products: true,
        },
    });

    (await adress).products.push(await product);

    await adressRepo.save(await adress)

    return reply.send({ adress, product })
}