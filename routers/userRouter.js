
const { Router } = require("express");

const userRouter = Router();
const userController = require("../controllers/userController");

userRouter.get("/",userController.getLogin);

userRouter.get("/system",userController.getSystem);

module.exports = userRouter;