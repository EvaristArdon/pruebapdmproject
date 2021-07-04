const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
var session = require("express-session");
const key_session= require("./config/properties")
const MongoStore = require('connect-mongo');
const handler = require("./config/errors_types");
const conn = require('./config/database');
require('./config/database');

//routes
const indexRouter = require('./routes/index');
const auth_apiRouter = require('./routes/auth-api');
const auth_webRouter = require('./routes/auth-web');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const fileRouter = require('./routes/file');

const staticFolder = './public';
const app = express();

app.use(
  session({
    secret: key_session.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: conn._connectionString})
  })
);

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, staticFolder)));

//routes back
app.use('/api/auth', auth_apiRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/file', fileRouter);

//routes front
app.use('/auth', auth_webRouter);
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.use((req, res) => {
  res.status(404).render('pages/404');
});

app.use(handler.errorHandler);
app.use(handler.notFoundHandler);

module.exports = app;
