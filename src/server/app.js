/* eslint-disable import/no-dynamic-require */
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import errorHandler from './middleware/error-handler';
import initialAppStateMiddleware from './middleware/initial-app-state-middleware';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// port configuration
app.set('port', process.env.PORT || 3000);

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(initialAppStateMiddleware);
require('./endpoints')(app);

require(`./app.${process.env.NODE_ENV}`)(app);

app.use(errorHandler);

module.exports = app;
