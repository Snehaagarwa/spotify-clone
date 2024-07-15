const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("./models/User");
require("dotenv").config();
const port = 8000;

app.use(express.json());
 
mongoose.connect("mongodb+srv://snehaagarwalmin21:"+process.env.MONGO_PASSWORD+"@cluster0.getw3xs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
        useNewUrlParser : true,
        useUnifiedTopology: true,
    })
.then((x)=>{
    console.log("Connected to Mongo!");
})
.catch((err)=>{
    console.log(err);
    console.log("Error while connecting to Mongo");
});


let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'AB12';
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findOne({ _id: jwt_payload._id }); // Ensure the payload key matches
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        console.log(error);
        return done(error, false);
    }
}));

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);


app.listen(port,()=>{
    console.log("App is running on port " +port);

});