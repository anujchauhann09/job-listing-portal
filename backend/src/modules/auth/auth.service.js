const prisma = require('@/config/prisma');
const { hashPassword, comparePassword } = require('@/utils/password.util');
const { generateAccessToken, generateRefreshToken } = require('@/utils/jwt.util');
const AppException = require('@/exceptions/app.exception');
const { REFRESH_TOKEN_EXPIRES_IN } = require('@/config/jwt.config');
const { getExpiryDate } = require("@/utils/time.util");

const { HTTP_STATUS } = require('@/constants/http-status');
const {
  AUTH_MESSAGES,
  USER_TYPES,
  ROLE_IDS
} = require('./auth.constants');

const registerUser = async ({ name, email, password, userType }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new AppException({
      status: HTTP_STATUS.CONFLICT,
      message: AUTH_MESSAGES.EMAIL_EXISTS
    });
  }

  const roleId = ROLE_IDS[userType];
  if (!roleId) {
    throw new AppException({
      status: HTTP_STATUS.BAD_REQUEST,
      message: AUTH_MESSAGES.INVALID_USER_TYPE
    });
  }

  const hashedPassword = await hashPassword(password);

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        roleId
      }
    });

    await tx.userProfile.create({
      data: {
        userId: user.id,
        name: name.trim()
      }
    });

    if (userType === USER_TYPES.JOB_SEEKER) {
      await tx.jobSeeker.create({
        data: {
          userId: user.id
        }
      });
    } else if (userType === USER_TYPES.EMPLOYER) {
      await tx.employer.create({
        data: {
          userId: user.id
        }
      });
    }

    return {
      uuid: user.uuid,
      createdAt: user.createdAt
    };
  });

  return result;
};

const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      role: true,
      profile: true   
    }
  });

  if (!user) {
    throw new AppException({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: AUTH_MESSAGES.INVALID_CREDENTIALS
    });
  }

  if (!user.isActive || user.isDeleted) {
    throw new AppException({
      status: HTTP_STATUS.FORBIDDEN,
      message: AUTH_MESSAGES.ACCOUNT_INACTIVE
    });
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new AppException({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: AUTH_MESSAGES.INVALID_CREDENTIALS
    });
  }

  const accessToken = generateAccessToken({
    sub: user.uuid,
    roleId: user.roleId
  });

  const refreshToken = generateRefreshToken({
    sub: user.uuid,
    roleId: user.roleId
  });

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: getExpiryDate(REFRESH_TOKEN_EXPIRES_IN)
    }
  });

  return {
    accessToken,
    refreshToken
  };
};


const refreshAccessToken = async (token) => {
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token },
    include: { user: true }
  });

  if (!storedToken || storedToken.isRevoked || storedToken.expiresAt < new Date()) {
    throw new AppException({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: AUTH_MESSAGES.INVALID_REFRESH_TOKEN
    });
  }

  const accessToken = generateAccessToken({
    sub: storedToken.user.uuid,
    roleId: storedToken.user.roleId
  });

  return { accessToken };
};


const logoutUser = async (token) => {
  if (!token) return;

  await prisma.refreshToken.updateMany({
    where: { token },
    data: { isRevoked: true }
  });
};

const me = async (uuid) => {
  const user = await prisma.user.findUnique({
    where: { uuid },
    include: {
      role: true,
      profile: true,
    },
  });

  return {
    uuid: user.uuid,
    email: user.email,
    name: user.profile?.name || null,
    role: user.role.name,
  };
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  me
};

