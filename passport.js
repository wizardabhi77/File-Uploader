
import db from "./scripts/script.js";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";

passport.use( new Strategy( async (username, password, done) => {

    const user = await db.findUser(username);
    
    if(!user) {
       return done(null, false, {message: "user not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if(!isMatch) {
        return done(null, false, {message: "password does not match"});
    }

    return done(null, user);
}))

passport.serializeUser((user,done) => {
    return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {

    const user = await db.findUserById(id);

    return done(null, user);
});

export default passport;