if (process.env.NEW_RELIC_LICENSE_KEY) {
  require('newrelic');
}
require("babel-register");
const path = require('path');
const { config } = require("dotenv");
if (process.env.NODE_ENV !== 'production') {
  console.log('loading development env config');
  config({ path: path.resolve(__dirname, '..', '.env-development') });
  config({ path: path.resolve(__dirname, '..', '.env') });
} else {
  console.log('loading production env config');
  config();
}

const express = require('express');
const { connect } = require('./db');
const initPassport = require('./init/passport').default;
const initExpress = require('./init/express').default;
const initRoutes = require('./init/routes').default;

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
// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
  console.log("!!!!");
  res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(app.get('port'));

/*


Request URL:http://local.2017.reversim.com:3000/auth/google
Request Method:GET
Status Code:302 Found
Remote Address:127.0.0.1:3000
Referrer Policy:no-referrer-when-downgrade

Response Headers
Connection:keep-alive
Content-Length:0
Date:Mon, 11 Sep 2017 02:38:06 GMT
Location:https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocal.2017.reversim.com%3A3000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=174493565929-a1cc348besbufjgnq7273iob274uhf0o.apps.googleusercontent.com

Request Headers
Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,* /*;q=0.8
Accept-Encoding:gzip, deflate
Accept-Language:en-US,en;q=0.8,he;q=0.6,it;q=0.4,pt;q=0.2
Cache-Control:no-cache
Connection:keep-alive
Cookie:sessionId=s%3ATuGApYZp51G_NWonRkL5hCgxvXXesoqQ.bML9IEjiETp3NHNZUbxvwJFi1xOlsJ0wI3rhnHJBPPI; _gat=1; _ga=GA1.2.513820418.1502530913; _gid=GA1.2.1267286511.1505097461
Host:local.2017.reversim.com:3000
Pragma:no-cache
Upgrade-Insecure-Requests:1
User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36

 */