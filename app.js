require('dotenv').config();
require('./configs/mongoose-config');
const allRoutes = require('./modules/routes');
const expresEjsLayouts = require('express-ejs-layouts');
const {notFound,errorsHandler} = require('./middlewares/errorHandler-middlewares');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MogoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const express = require('express');

const app = express();


app.set('view engine','ejs');
app.set('views','views');
app.use(expresEjsLayouts);
app.set('layout','./home/layout');


app.use(express.static('public'));
app.use(express.urlencoded({extended : true }));
app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    store : MogoStore.create({
        mongoUrl : process.env.DB_URI,
        collectionName : 'sessions'
    }),
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true ,
        sameSite : 'lax',
        maxAge : 1000 * 60 * 30
    }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use('/',allRoutes);

app.use(notFound);
app.use(errorsHandler);

app.listen(process.env.PORT,()=>console.log(`serivce run on port : ${process.env.PORT}`));
