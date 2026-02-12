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

async function createFile (filename, type, size, added, uid) {
    await prisma.file.create({
        data : {
            filename : filename,
            type : type,
            size : size,
            userId : uid
        }
    })
}

async function findAllFiles () {
   const files = await prisma.file.findMany();

   return files;
}

export default {
    findUser,
    findUserById,
    findAllFiles,
    createUser,
    createFile
}
