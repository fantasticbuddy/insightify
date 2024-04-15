const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ // Schema make a new prototype (datatype) -> userSchema
    username: { 
        type: String,
        required: true,
        unique: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
});

const User = mongoose.model('User', userSchema); // User is model (collection)
module.exports = User;