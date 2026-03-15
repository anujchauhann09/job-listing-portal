const { registerSchema, loginSchema } = require("./auth.validators");
const authService = require("./auth.service");
const { ApiResponse } = require("@/responses/api.response");
const { HTTP_STATUS } = require("@/constants/http-status");
const { AUTH_MESSAGES } = require("./auth.constants");
const AppException = require("@/exceptions/app.exception");
const {
  setAuthCookies,
  clearAuthCookies,
  tokenCookieOptions,
} = require("@/utils/authCookies.util");
const { verifyToken } = require("@/utils/jwt.util");

const register = async (req, res, next) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const user = await authService.registerUser(validatedData);

    return new ApiResponse({
      success: true,
      message: AUTH_MESSAGES.USER_CREATED,
      data: user,
    }).send(res, HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await authService.loginUser(validatedData);

    setAuthCookies(res, result);

    // Get user info to return in response
    const user = await authService.me(result.userUuid);

    return new ApiResponse({
      success: true,
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      data: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: user,
      },
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    // Try to get refresh token from body first, then from cookies
    const refreshToken = req.body.refreshToken || req.cookies.refreshToken;
    
    if (!refreshToken) {
      throw new AppException({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: AUTH_MESSAGES.INVALID_REFRESH_TOKEN,
      });
    }
    
    const { accessToken } = await authService.refreshAccessToken(refreshToken);

    res.cookie("accessToken", accessToken, tokenCookieOptions);

    return new ApiResponse({
      success: true,
      message: AUTH_MESSAGES.TOKEN_REFRESHED,
      data: { accessToken },
    }).send(res, HTTP_STATUS.OK);
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    // Try to get refresh token from cookies first, then from body
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (refreshToken) {
      await authService.logoutUser(refreshToken);
    }

    clearAuthCookies(res);

    return new ApiResponse({
      success: true,
      message: AUTH_MESSAGES.LOGOUT_SUCCESS,
    }).send(res, HTTP_STATUS.OK);
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.me(req.user.sub);

    return new ApiResponse({
      success: true,
      message: AUTH_MESSAGES.ME_FETCHED,
      data: user,
    }).send(res, HTTP_STATUS.OK);
  } catch (err) {
    next(err);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    await authService.deleteAccount(req.user.sub);
    clearAuthCookies(res);
    return new ApiResponse({
      success: true,
      message: 'Account deleted successfully',
    }).send(res, HTTP_STATUS.OK);
  } catch (err) {
    next(err);
  }
};

// Called by the frontend after OAuth redirect to set cookies on the frontend domain
// The access token from the redirect URL is passed in the body, verified, then
// cookies are set on this response which travels through the Next.js proxy
const exchangeOAuthSession = async (req, res, next) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      throw new AppException({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Access token is required',
      });
    }

    // Verify the token is valid (throws if not)
    const payload = verifyToken(accessToken);

    // Get the full user record (includes id needed for refresh token)
    const AuthRepository = require('./auth.repository');
    const authRepo = new AuthRepository();
    const dbUser = await authRepo.findUserByUuid(payload.sub);

    if (!dbUser) {
      throw new AppException({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: 'User not found',
      });
    }

    // Issue a fresh refresh token
    const { generateRefreshToken } = require("@/utils/jwt.util");
    const { getExpiryDate } = require("@/utils/time.util");
    const { REFRESH_TOKEN_EXPIRES_IN } = require("@/config/jwt.config");

    const refreshToken = generateRefreshToken({ sub: payload.sub, roleId: payload.roleId });
    await authRepo.saveRefreshToken({
      token: refreshToken,
      userId: dbUser.id,
      expiresAt: getExpiryDate(REFRESH_TOKEN_EXPIRES_IN),
    });

    // Set cookies — this response goes through the Next.js proxy so cookies
    // land on the frontend domain
    setAuthCookies(res, { accessToken, refreshToken });

    const user = {
      uuid: dbUser.uuid,
      email: dbUser.email,
      name: dbUser.profile?.name || null,
      role: dbUser.role.name,
    };

    return new ApiResponse({
      success: true,
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      data: { user },
    }).send(res, HTTP_STATUS.OK);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getMe,
  deleteAccount,
  exchangeOAuthSession,
};
