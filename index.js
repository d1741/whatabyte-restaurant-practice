// required external modules
const path = require('path');
const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

require('dotenv').config();

// app variables
const app = express();
const port = process.env.PORT || '7500';

// session config
const session = {
	secret: 'noifsandsorbutswithagifthorseinthemouth',
	cookie: {},
	resave: false,
	saveUninitialized: false
};

if (app.get('env') === 'production') {
	session.cookie.secure = true;
}
// passport config

// app config
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//.static() is built in middle-ware, .use() mounts the middle-ware so the public directory is the source of static assets (home to CSS/img files)
app.use(express.static(path.join(__dirname, 'public')));

// handles GET requests made to the root path and, if the req is successful, renders index.pug as the client response
app.get('/', (req, res) => {
	res.render('index', { title: 'Home' });
});

app.get('/login', (req, res, next) => {});

// GET to render user profile
app.get('/user', (req, res) => {
	res.render('user', { title: 'Profile', userProfile: { nickname: 'Auth' } });
});

app.listen(port, () => {
	console.log(`Listening for requests at http://localhost:${port}`);
});
