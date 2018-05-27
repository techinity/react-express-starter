/* eslint-disable import/no-dynamic-require */
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import errorHandler from './middleware/error-handler';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// port configuration
app.set('port', process.env.PORT || 3000);

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require(`./app.${process.env.NODE_ENV}`)(app);
require('./app.storybook')(app);

app.use(errorHandler);

module.exports = app;
