
import Express from "express";

const app = Express();

import path from "node:path";

import session from "express-session";

import { prisma } from "./lib/prisma.js";

import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import userRouter from "./routers/userRouter.js";

app.set("views","./views");
app.set("view engine","ejs");

app.use(Express.urlencoded({ extended : true}));

app.use(
    session( {
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'bhimavaram bullodu',
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
    })
);

app.use("/",userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if(error){
        throw error;
    }
    console.log("YEAH BABY! SERVER RUNNING @ "+ PORT);
})