import { prisma } from "../lib/prisma.js";

async function findUser (username) {
    const user = await prisma.users.findUnique({
        where : {
            username : username,
        }
    });
    return user;
}

async function findUserById (id) {
    const user = await prisma.users.findUnique({
        where : {
            id : id,
        }
    })
    return user;
}

async function createUser (username, password) {
    await prisma.users.create({
        data : {
            username : username,
            password : password
        }
    })

}

export default {
    findUser,
    findUserById,
    createUser
}
