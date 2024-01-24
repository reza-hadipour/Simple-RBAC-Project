const User = require('./models/user');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl,{})
    .then(()=>{
        console.log('MongoDB is available.');
    })
    .catch(err=>{
        console.log(err);
        process.exit(0);
    })

const sessionOption = {
    secret : "c1c13D#2E!3D#2E!c13c13D#2E!D#2E!",
    resave : false,
    saveUninitialized: false
}


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(expressSession(sessionOption));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routers  
const recordsRoutes = require('./routes/records');
const authRoutes = require('./routes/auth');

app.use('/auth',authRoutes);
app.use('/records',recordsRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
