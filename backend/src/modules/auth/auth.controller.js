const { registerSchema, loginSchema } = require('./auth.validator');
const authService = require('./auth.service');
const { ApiResponse } = require('../../responses/api.response');

const register = async (req, res, next) => {
  try {
    const validatedData = registerSchema.parse(req.body);    
    const user = await authService.registerUser(validatedData);

    return new ApiResponse({
      success: true,
      message: 'User registered successfully',
      data: user
    }).send(res, 201); 
  } catch (error) {
    next(error);
  }
};


const login = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await authService.loginUser(validatedData);

    return new ApiResponse({
      success: true,
      message: 'Login successful',
      data: result
    }).send(res, 200);
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshAccessToken(refreshToken);

    return new ApiResponse({
      success: true,
      message: 'Token refreshed',
      data: result
    }).send(res, 200);
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    await authService.logoutUser(refreshToken);

    return new ApiResponse({
      success: true,
      message: 'Logged out successfully'
    }).send(res, 200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout
};
