
import { Router } from "express";
import passport from "../passport.js";
import registerValidation from "../validators/registerValidation.js"

const userRouter = Router();

import userController from "../controllers/userController.js";

import multer from "multer";

const upload = multer({dest: "uploads/"});

userRouter.use(passport.session());

function userAuthenticated (req, res, next) {
    if(req.isAuthenticated()) return next ();
    res.redirect("/");
}

userRouter.get("/",userController.getLogin);

userRouter.get("/system",userAuthenticated,userController.getSystem);

userRouter.get("/sign-up",userController.getSignUp);



userRouter.post("/sign-up",userController.postSignUp);

userRouter.post("/login", registerValidation, passport.authenticate("local",{
    successRedirect: "/system",
    failureRedirect: "/"
})
);

userRouter.post("/file", upload.single("file"), userController.postFile);

export default userRouter;