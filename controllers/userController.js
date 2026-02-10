import db from "../scripts/script.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

function getLogin (req,res) {
    res.render("login-form");
}

function getSystem (req, res) {
    res.render("system");
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

export default {
    getLogin,
    getSignUp,
    getSystem,
    postSignUp
};