require("babel-register");
require("react-scripts/config/env");
const express = require('express');
const { connect } = require('./db');
const initPassport = require('./init/passport').default;
const initExpress = require('./init/express').default;
const initRoutes = require('./init/routes').default;

process.env.GOOGLE_CLIENTID = process.env.REACT_APP_GOOGLE_CLIENTID;
process.env.GOOGLE_SECRET = process.env.REACT_APP_GOOGLE_SECRET;


const app = express();

/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
connect();

/*
 * REMOVE if you do not need passport configuration
 */
initPassport();

/*
 * Bootstrap application settings
 */
initExpress(app);

/*
 * REMOVE if you do not need any routes
 *
 * Note: Some of these routes have passport and database model dependencies
 */
initRoutes(app);

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * renderMiddleware matches the URL with react-router and renders the app into
 * HTML
 */
// app.get('*', renderMiddleware);

app.listen(app.get('port'));