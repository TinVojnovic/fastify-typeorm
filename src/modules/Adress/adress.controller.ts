import { FastifyReply, FastifyRequest } from "fastify";
import { Adress, AdressType } from "../entities/Adress";
import { AppDataSource } from "../../app";
import { User } from "../entities/User";

//TODO Add error handling

interface addAdressBody{
    adress: string,
    type: AdressType,
    userId: number
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