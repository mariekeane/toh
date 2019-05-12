import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as mongoConfig from './config/config';
import routes from './routes/index';


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
mongoose.connect(mongoConfig.mongoURL, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
console.log('MongoDB database connection established successfully!');
});

const app = express();

// Parser for POST data
app.use(bodyParser.json());
app.use(cors());

// Set up API routes
app.use('/', routes);

// Listen on provided port, on all network interfaces.
app.listen(4000, () => console.log(`Express server running on port 4000`));