require('dotenv').config();
const bcrypt = require('bcryptjs'); // for password hashing
const jwt = require('jsonwebtoken'); // for token generation/validation
const User = require('../models/user'); // user model

// controller method for user registration
exports.register = async (req, res) => { // req is object coing from frontend (json)
  try {
    const { username, email, password } = req.body; // extract user data from request body    
    const existingUser = await User.findOne({ email }); // check if user with the same email already exists. findOne -> first object with same email
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // hash the password
    const newUser = new User({ username, email, password: hashedPassword }); // create a new user document
    const newUserDatabase = await newUser.save();
     // make new user in database

    const token = jwt.sign({ userId: newUserDatabase._id }, process.env.JWT_SECRET, { expiresIn: '1d' }); // sign -> giving signature to each user
    res.status(201).json({ token, username, email }); // json is the return value for frontend
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// controller method for user login
exports.login = async (req, res) => {
  try {
    if(req.user){
      const user = await User.findOne({_id : req.user});
      return res.status(200).json({ email : user.email, username : user.username });
    }
    const { email, password } = req.body; // extract user data from request body
    const user = await User.findOne({ email }); // check if user with the provided email exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // generate JWT (library) token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' }); // sign -> giving signature to each user
    res.status(200).json({ token, email, username : user.username });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
