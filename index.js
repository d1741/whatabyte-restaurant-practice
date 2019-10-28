const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || '7500';

app.get('/', (req, res) => {
	res.status(200).send('WHATABYTE: Food for Devs');
});

app.listen(port, () => {
	console.log(`Listening for requests at http://localhost:${port}`);
});
