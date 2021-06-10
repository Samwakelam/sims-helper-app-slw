const express = require('express');
const app = express();

const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const logger = require('morgan');

// const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 5000;

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// // Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

// app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

// // Send every other request to the React app
// // Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });
console.log('process.env =', process.env.DATABASE);

const dbUrl = process.env.DATABASE;
const host = process.env.HOST;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
};

mongoose.connect(
	process.env.MONGODB_URI || `mongodb://${host}/${dbUrl}`,
	options
)
	.then(() => {
		app.listen(PORT, function () {
			console.log('Node server is running...');
			console.log('Listening on port:', PORT);
		});
	})
	.catch((err) => {
		console.log(err);
	});
