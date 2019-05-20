import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config/index';
import api from './routes/api';
import path from 'path';
import http from 'http';
import { seedHeroCollection } from './controllers/seed';


// Fixes for deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// Mongo Connection
mongoose.connect(`${config.protocol}://${config.host}/${config.heroes}`);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

if (config.env == 'test') {
    seedHeroCollection().then(_ => {
        console.log('Done Seeding Data!');
    }).catch(err => {
        console.log('Error Seeding Data!');
    });
}

const app = express();

// Parser for POST data
app.use(bodyParser.json());
app.use(cors());

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist/angular-tour-of-heroes')));
// Set up API routes
app.use('/api', api);
// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/angular-tour-of-heroes/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
//const port = process.env.PORT || '3000';
const port = config.port;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
app.listen(port, () => console.log(`Express server running on ${port}`));

module.exports = app;