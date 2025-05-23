const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserService {
  //create a new user
  async createUser(userData){
    try{
      const user = await User.create(userData);
      return user;
    }catch(error){
      throw new Error('Failed to create user');
    }
  }
  //get user by id 
  async getUserById(userId){
    try
    {
      const user = await User.findById(userId); 
      if(!user)
      {
        throw new Error('User not found');
      }
      return user;
    }catch(error){
      throw new Error('Failed to get user');
    }
  }
  //update user by id
  async updateUserById(userId, userData){
    try{
      const user = await User.findByIdAndUpdate(userId, userData, {new: true});
      if(!user)
      {
        throw new Error('User not found');
      }
      return user;
    }catch(error){
      throw new Error('Failed to update user');
    }
  }
  async login(email, password)
  {
    try{
      const user = await User.findOne({email}); 
      if(!user)
      {
        throw new Error('User not found');
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error("Invalid email or password");
      }
      if(!user.is_active)
      {
        throw new Error("Your account is disabled");
      }
      const token = this.generateToken(user._id);
      return  token
    }catch(error){
      throw new Error(error.message || "Login failed");
    }
  }
  
  generateToken(userId) {
    return jwt.sign(
      { id: userId }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }
  
}

module.exports = new UserService();
