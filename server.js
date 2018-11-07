
// Requirements
var express = require('express'); //Express main framework
var session = require('express-session'); //Express sesion manager
var cookieParser = require('cookie-parser'); //Save session using cookies
var bodyParser = require('body-parser'); //Used for req.body property 
var morgan = require('morgan'); //Request logger
var passport = require('passport'); //Authentication middleware
var flash = require('connect-flash'); //A special area of the session used for storing messages

// Custom requirements
//var sql = require("./app/sql_handler");



var app = express(); 
var port = process.env.PORT || 3838;

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration


// Front-end application is stored in /public (.js, .css, .ejs)
// Remember ejs ~ html
app.use(express.static(__dirname + '/public'));


app.use(morgan('dev')); // Set morgan to log every request to the console
app.use(cookieParser()); // Read cookies (needed for auth)

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // Set up ejs how templates motor

// Config passport secret session requirements
app.use(session({
    secret: 'vidyapathaisalwaysrunning',  //Custom password for encypt
    resave: true,
    saveUninitialized: true
})); 
app.use(passport.initialize());
app.use(passport.session()); // Make persistent login sessions
app.use(flash()); 


// Define routes ****************************************************************
require('./app/routes.js')(app, passport, app_creator, db_sql); // load our routes and pass in our app and fully configured passport

// Run app ***********************************************************************
app.listen(port);
console.log('Visit http://localhost:' + port);
