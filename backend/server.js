require('dotenv').config(); // for using environment variables
// Import required modules
const cors = require('cors'); //  to link diff origins (domain names) b/w frontend and backend
const bodyParser = require('body-parser'); // parsing the data in correct format
const mongoose = require('mongoose') // importing the mongoose library (an Object Data Modeling library for MongoDB and Node.js)
const express = require('express'); // exported as a function provides functionality of routes and middlewares
const authRoutes = require('./routes/authRoutes'); // properly segregating API calls for diff. purposes
// Initialize Express app
const app = express();

// middlewares
app.use(cors()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// Define routes
app.use('/auth', authRoutes); // the request will directly go to authRoutes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Example API route
app.get('/api/data', (req, res) => {
  const data = {
    message: 'This is sample data from the server'
  };
  res.json(data);
});

// Start the server
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.mongoURI)
    .then(()=>{
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}\n Connected to database`);
        });
    })
