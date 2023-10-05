// app.js

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const postRoutes = require('./routes/postRoutes');
const usersRoutes = require('./routes/usersRoutes');
const commentRoutes = require('./routes/commentRoutes');

const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const connectDatabase = require('./config/database.js');
const verifyToken = require('./middleware/auth.js'); // Replace with the correct path

var app = express();

connectDatabase();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/posts', verifyToken, postRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/comments', verifyToken, commentRoutes);

app.use('/api/auth/check-admin', verifyToken, (req, res) => {
  // Assuming user roles are stored in the token
  const isAdmin = req.user.role === 'admin';

  res.json({ isAdmin });
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

