import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../entities/User";
import { Entity } from "typeorm";
import { hashPassword } from "../../utils/hash";

interface BodyType {
    name: string,
    lastname: string,
    email: string,
    password: string,
    salt: string
  }

export async function registerUserHandler(req: FastifyRequest, reply: FastifyReply) {
    const {name, lastname, email, password} = <BodyType>req.body;

    const {hash, salt} = hashPassword(password)

    const user = User.create({
        name: name,
        lastname: lastname,
        email: email,
        password: hash,
        salt: salt
    })

    await user.save()
    return reply.send(user) 
}

export async function getUsersHandler(req: FastifyRequest, reply: FastifyReply) {
    const user = await User.find({
        select: {
            name: true,
            lastname: true,
            email: true
        },
    })

    return reply.send(user) 
}