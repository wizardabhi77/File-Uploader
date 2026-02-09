
const Express = require("express");

const app = Express();

const path = require("node:path");

const session = require("express-session");
require("dotenv/config");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("./generated/prisma/client");
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const userRouter = require("./routers/userRouter");

app.set("views", path.join(__dirname,"views"));
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