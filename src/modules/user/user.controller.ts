import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../entities/User";
import { DataSource, Entity } from "typeorm";
import { hashPassword, verifyPassword } from "../../utils/hash";
import { AppDataSource, server } from "../../app";

interface CreateUserBody {
    name: string,
    lastname: string,
    email: string,
    password: string,
    salt: string
}

interface LoginBody {
    email: string,
    password: string
}

//TODO Add error handling

export async function registerUserHandler(req: FastifyRequest, reply: FastifyReply) {
    const { name, lastname, email, password } = <CreateUserBody>req.body;

    const { hash, salt } = hashPassword(password)

    const user = User.create({
        name: name,
        lastname: lastname,
        email: email,
        password: hash,
        salt: salt
    })


    await user.save()
    return reply.send({ name, lastname, email })
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

export async function loginHandler(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = <LoginBody>req.body;

    const userRepo = AppDataSource.getRepository(User)

    const user = userRepo.findOne({
        where: {
            email: email,
        }
    })

    //TODO the way of getting the properties of "user" seems odd. Could possibly find a way to do it differently
    //the "user" is of type Promise<User> instead of <User> entity

    const correctPassword = verifyPassword(password, (await user).salt, (await user).password)

    if (correctPassword) {
        return reply.send({ accessToken: server.jwt.sign( {email: (await user).email} )})
    }

    return reply.send((await user).email)
}