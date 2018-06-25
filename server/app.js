require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds263670.mlab.com:63670/fb_users`, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database Users Connected !');
  }
});

const fs = require('fs');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var statusesRouter = require('./routes/statuses');
var commentsRouter = require('./routes/comments');

var app = express();

const typeDef = fs.readFileSync('./graphql/typedefs.gql', 'utf8');
const resolver = require('./graphql/resolver');
const schemas = makeExecutableSchema({
  typeDefs: typeDef,
  resolvers: resolver
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/statuses', statusesRouter);
app.use('/comments', commentsRouter);

app.use('/graphql', graphqlExpress({ schema: schemas }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
