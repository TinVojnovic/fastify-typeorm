import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../entities/User";
import { Entity } from "typeorm";

interface BodyType {
    name: string,
    lastname: string,
    email: string,
    password: string,
    salt: string
  }

export async function registerUserHandler(req: FastifyRequest, reply: FastifyReply) {
    const {name, lastname, email, password} = <BodyType>req.body;

    const user = User.create({
        name: name,
        lastname: lastname,
        email: email,
        password: password,
        salt:"123"
    })

    await user.save()
    return reply.send(user) 
}

export async function getUsersHandler(req: FastifyRequest, reply: FastifyReply) {
    User.find().then((data) => {
        return reply.send(data) //TODO: fix this
    })
}