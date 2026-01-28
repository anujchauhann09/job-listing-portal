const AuthRepository = require('./auth.repository');

const { hashPassword, comparePassword } = require('@/utils/password.util');
const { generateAccessToken, generateRefreshToken } = require('@/utils/jwt.util');
const { getExpiryDate } = require('@/utils/time.util');
const { REFRESH_TOKEN_EXPIRES_IN } = require('@/config/jwt.config');

const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { AUTH_MESSAGES, ROLE_IDS } = require('./auth.constants');

class AuthService {
  constructor() {
    this.authRepo = new AuthRepository();
  }

  async registerUser({ name, email, password, userType }) {
    const existingUser = await this.authRepo.findUserByEmail(email);
    if (existingUser) {
      throw new AppException({
        status: HTTP_STATUS.CONFLICT,
        message: AUTH_MESSAGES.EMAIL_EXISTS,
      });
    }

    const roleId = ROLE_IDS[userType];
    if (!roleId) {
      throw new AppException({
        status: HTTP_STATUS.BAD_REQUEST,
        message: AUTH_MESSAGES.INVALID_USER_TYPE,
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await this.authRepo.createUserWithProfile({
      email,
      password: hashedPassword,
      roleId,
      name,
      userType,
    });

    return {
      uuid: user.uuid,
      createdAt: user.createdAt,
    };
  }

  async loginUser({ email, password }) {
    const user = await this.authRepo.findUserByEmail(email);

    if (!user || !user.isActive || user.isDeleted) {
      throw new AppException({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: AUTH_MESSAGES.INVALID_CREDENTIALS,
      });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      throw new AppException({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: AUTH_MESSAGES.INVALID_CREDENTIALS,
      });
    }

    const accessToken = generateAccessToken({
      sub: user.uuid,
      roleId: user.roleId,
    });

    const refreshToken = generateRefreshToken({
      sub: user.uuid,
      roleId: user.roleId,
    });

    await this.authRepo.saveRefreshToken({
      token: refreshToken,
      userId: user.id,
      expiresAt: getExpiryDate(REFRESH_TOKEN_EXPIRES_IN),
    });

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(token) {
    const storedToken = await this.authRepo.findRefreshToken(token);

    if (
      !storedToken ||
      storedToken.isRevoked ||
      storedToken.expiresAt < new Date()
    ) {
      throw new AppException({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: AUTH_MESSAGES.INVALID_REFRESH_TOKEN,
      });
    }

    const accessToken = generateAccessToken({
      sub: storedToken.user.uuid,
      roleId: storedToken.user.roleId,
    });

    return { accessToken };
  }

  async logoutUser(token) {
    if (!token) return;
    await this.authRepo.revokeRefreshToken(token);
  }

  async me(uuid) {
    const user = await this.authRepo.findUserByUuid(uuid);
    if (!user) return null;

    return {
      uuid: user.uuid,
      email: user.email,
      name: user.profile?.name || null,
      role: user.role.name,
    };
  }
}

module.exports = new AuthService();
