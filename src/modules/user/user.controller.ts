import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../entities/User";
import { DataSource, Entity } from "typeorm";
import { hashPassword, verifyPassword } from "../../utils/hash";
import { AppDataSource, server } from "../../app";
import { Product } from "../entities/Product";
import { Adress, AdressType } from "../entities/Adress";

interface CreateUserBody {
    name: string,
    lastname: string,
    email: string,
    password: string,
    salt: string,
    adress: string
}

interface LoginBody {
    email: string,
    password: string
}

interface userIdBody {
    userId: number
}

//TODO Add error handling

export async function registerUserHandler(req: FastifyRequest, reply: FastifyReply) {
    const { name, lastname, email, password, adress } = <CreateUserBody>req.body;

    const { hash, salt } = hashPassword(password)

    const homeAdress = Adress.create({
        adress: adress,
        type: AdressType.HOME
    })

    await homeAdress.save()

    const user = User.create({
        name: name,
        lastname: lastname,
        email: email,
        password: hash,
        salt: salt,
        adresses: [homeAdress]
    })


    await user.save()
    return reply.send({ name, lastname, email, adress })
}

export async function getUsersHandler(req: FastifyRequest, reply: FastifyReply) {
    const users = await User.find({
        select: {
            name: true,
            lastname: true,
            email: true
        },
    })

    return reply.send(users)
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
        return reply.send({ accessToken: server.jwt.sign({ email: (await user).email }) })
    }

    return reply.send((await user).email)
}

export async function getProducts(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = <userIdBody>req.body;

    const userRepo = AppDataSource.getRepository(User)

    const user = userRepo.findOne({
        where: {
            id: userId,
        },
        relations: ['adresses', 'adresses.products']
    });

    const { adresses } = (await user);

    const products = [];

    adresses.forEach(adress => {
        products.push(...adress.products)
    });


    return reply.send({ products })

}

//I would've made it so you don't need to pass the userID into the body of the request
//by getting the user from the jwtToken, but authentication doesn't seem to work

/*export async function addProduct(req: FastifyRequest, reply: FastifyReply) {
    const { productId, userId } = <addProductBody>req.body;

    const userRepo = AppDataSource.getRepository(User)
    const productRepo = AppDataSource.getRepository(Product)

    const product = productRepo.findOne({
        where: {
            id: productId,
        },
    });

    const user = userRepo.findOne({
        where: {
            id: userId,
        },
        relations: {
            products: true,
        },
    });

    (await user).products.push(await product);

    await userRepo.save(await user)

    return reply.send({ user, product })
}*/