////////////////////////////IMPORTS////////////////////////////
//---------------------------Librerias-----------------------//
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

//----------------------------Modulos------------------------//
const indexRouter = require('./routes/index.routes');
const usersRouter = require('./routes/users.routes');
const authRouter = require('./routes/auth.routes');
const postsRouter = require('./routes/posts.routes');


const app = express();
////////////////SETTINGS & MIDDLEWARES/////////////////////////
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

///////////////////////////ROUTES//////////////////////////
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

////////////////Export HTTP server/////////////////////////
module.exports = app;