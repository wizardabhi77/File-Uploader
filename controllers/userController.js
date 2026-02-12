import db from "../scripts/script.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";


function getLogin (req,res) {
    res.render("login-form");
}

async function getSystem (req, res) {
    const files = await db.findAllFiles();
    res.render("system", {files : files});
}

function getSignUp (req,res) {
    res.render("sign-up-form", {errors: []});
}

async function postSignUp (req,res) {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.render("sign-up-form", {
            errors : errors.array()
        });
    }

    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.createUser(username, hashedPassword);
    res.redirect("/system");
}

async function postFile (req,res) {

    const {originalname, mimetype, size} = req.file;
    const added = new Date();
    const uid = req.user.id;
    
    await db.createFile(originalname, mimetype, size, added, uid);
    res.redirect("/system");
}

export default {
    getLogin,
    getSignUp,
    getSystem,
    postSignUp,
    postFile
};