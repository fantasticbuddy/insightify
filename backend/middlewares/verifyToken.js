require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // user model
const verifyToken = async (req, res, next) => { // next -> tell to go to next function/middleware varna yhi khtm kr dega function
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(404).json({message: "Auth token not found"});
    } 
    const token = authorization.split(' ')[1]; // authorization = "Bearer <token>"
    try{
        const {userId} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id : userId}).select('_id');
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        req.user = user;
        next();
    } catch{
        res.status(401).json({message: "Auth token not verified"});
    }
}
module.exports = verifyToken;