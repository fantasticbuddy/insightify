const mongoose = require('mongoose') // importing the mongoose library (an Object Data Modeling library for MongoDB and Node.js)

const db = mongoose.connection; // this is to get the default connection object from mongoose
  
// for successful connection
db.on('connected', () => {
console.log('Connected to MongoDB');
});
  
// for connection errors
db.on('error', (err) => {
console.error('MongoDB connection error:', err);
});

module.exports = mongodb; // exporting database connection object to make it available in other parts of application