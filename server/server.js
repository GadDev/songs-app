const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const PASSWORD = process.env.PASSWORD;
const USER = process.env.USERDB;
console.log(PASSWORD);
console.log(USER);
// Replace with your mongoLab URI
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0.9rt9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log('=========================>', MONGO_URI);
if (!MONGO_URI) {
	throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.connection
	.once('open', () => console.log('Connected to Mongo Atlas instance.'))
	.on('error', (error) =>
		console.log('Error connecting to MongoLab:', error)
	);

app.use(bodyParser.json());
app.use(
	'/graphql',
	expressGraphQL({
		schema,
		graphiql: true,
	})
);

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
