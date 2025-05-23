const User = require('../models/User');

const userService = require('../services/userService');

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone } = req.body;
    
    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: '400',
        message: 'Email already exists',
        errors: [{ field: 'email', message: 'Email already exists' }]
      });
    }
    
    // Tạo user mới (loại bỏ confirmPassword)
    const { confirmPassword, ...userData } = req.body;
    const user = await User.create(userData);
    
    // Tạo token
    const token = userService.generateToken(user._id);
    
    // Trả về kết quả
    res.status(201).json({
      status: '201',
      data: {
        user: {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          is_active: user.is_active
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      status: '500',
      message: error.message || 'Registration failed'
    });
  }
};

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        status: '400',
        message: 'User not found'
      });
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
      return res.status(400).json({
        status: '400',
        message: 'Invalid password'
      });
    }
    if(!user.is_active){
      return res.status(400).json({
        status: '400',
        message: 'Your account is disabled'
      })
    }
    const token = userService.generateToken(user._id);
    res.status(200).json({
      status: '200',  
      message: "Login successfully",
      result: {   
        token 
      }
    });
  }catch(error){
    return res.status(500).json({
      status: '500',
      message: error.message || 'Login failed'
    });
  }
}

const logout = async (req, res) => {
  try {
    const {token} = req.body; 
    if(!token){
      return res.status(400).json({
        status: '400',
        message: 'Access token is required'
      })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if(!user){
      return res.status(400).json({
        status: '400',
        message: 'User not found'
      })
    }

    

  }catch(error){
    return res.status(500).json({
      status: '500',
      message: error.message || 'Logout failed'
    })
  }
}
const forgotPassword = async (req, res) => {
  try {
    
    const {email} = req.body; 
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        status: '400',
        message: 'User not found'
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: '500',
      message: error.message || 'Forgot password failed'
    })
  }
}

module.exports = {
  register,
  login,
  logout
} 


