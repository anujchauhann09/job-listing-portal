const { registerSchema, loginSchema } = require('./auth.validator');
const authService = require('./auth.service');
const { ApiResponse } = require('@/responses/api.response');
const { HTTP_STATUS } = require('@/constants/http-status');
const { AUTH_MESSAGES } = require('./auth.constants');

const register = async (req, res, next) => {
  try {
    const validatedData = registerSchema.parse(req.body);    
    const user = await authService.registerUser(validatedData);

    return new ApiResponse({
      success: true,
      message: AUTH_MESSAGES.USER_CREATED,
      data: user
    }).send(res, HTTP_STATUS.CREATED); 
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
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      data: result
    }).send(res, HTTP_STATUS.OK);
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
      message: AUTH_MESSAGES.TOKEN_REFRESHED,
      data: result
    }).send(res, HTTP_STATUS.OK);
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
      message: AUTH_MESSAGES.LOGOUT_SUCCESS,
    }).send(res, HTTP_STATUS.OK);
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
