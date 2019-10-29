const path = require('path');

// imports express module
const express = require('express');

// executes express function and stores it in app variable
const app = express();
const port = process.env.PORT || '7500';

// Connects the Pug templates with the controllers:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// handles GET requests made to the root path and, if the req is successful, renders index.pug as the client response
app.get('/', (req, res) => {
	res.render('index', { title: 'Home' });
});

app.listen(port, () => {
	console.log(`Listening for requests at http://localhost:${port}`);
});
