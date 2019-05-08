import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config/index';
import api from './routes/api';
import path from 'path';
import http from 'http';


// Fixes for deprecation warnings
/* 
    Replace update() with updateOne(), updateMany(), or replaceOne()
    Replace remove() with deleteOne() or deleteMany().
    Replace count() with countDocuments(), unless you want to count how 
        many documents are in the whole collection (no filter). In the latter 
        case, use estimatedDocumentCount().
 */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// Mongo Connection
mongoose.connect(config.db);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

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