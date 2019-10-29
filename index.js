// required external modules
const path = require('path');
const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

require('dotenv').config();

// app variables
const authRouter = require('./auth');
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
const strategy = new Auth0Strategy(
	{
		domain: process.env.AUTH0_DOMAIN,
		clientID: process.env.AUTH0_CLIENT_ID,
		clientSecret: process.env.AUTH0_CLIENT_SECRET,
		callbackURL:
			process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
	},
	function(accessToken, refreshToken, extraParams, profile, done) {
		/**
		 * Access tokens are used to authorize users to an API
		 * (resource server)
		 * accessToken is the token to call the Auth0 API
		 * or a secured third-party API
		 * extraParams.id_token has the JSON Web Token
		 * profile has all the information from the user
		 */
		return done(null, profile);
	}
);
// app config
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//.static() is built in middle-ware, .use() mounts the middle-ware so the public directory is the source of static assets (home to CSS/img files)
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// storing and retrieving user data from a session:
passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});

// handles GET requests made to the root path and, if the req is successful, renders index.pug as the client response
app.get('/', (req, res) => {
	res.render('index', { title: 'Home' });
});

// GET to render user profile
app.get('/user', (req, res) => {
	res.render('user', { title: 'Profile', userProfile: { nickname: 'Auth' } });
});

app.listen(port, () => {
	console.log(`Listening for requests at http://localhost:${port}`);
});
