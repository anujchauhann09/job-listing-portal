const fs = require('fs');
const path = require('path');

const EmployerRepository = require('./employer.repository');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { EMPLOYER_MESSAGES, LOGO_MESSAGES } = require('./employer.constants');

class EmployerLogoService {
  constructor() {
    this.employerRepository = new EmployerRepository();
  }

  async uploadLogo(userUuid, file) {
    const user = await this.employerRepository.getUserByUuid(userUuid);

    if (!user) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'User not found',
      });
    }

    const employer = await this.employerRepository.findByUserId(user.id);

    if (!employer) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: EMPLOYER_MESSAGES.PROFILE_NOT_FOUND,
      });
    }

    if (employer.companyLogoUrl) {
      const oldPath = path.join(process.cwd(), employer.companyLogoUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    // Store relative path in database for backend use
    const relativePath = `/uploads/logos/${file.filename}`;
    await this.employerRepository.updateLogo(user.id, relativePath);

    // Return full backend URL for frontend to use
    const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
    const companyLogoUrl = `${backendUrl}${relativePath}`;

    return { companyLogoUrl };
  }

  async getLogo(userUuid) {
    const user = await this.employerRepository.getUserByUuid(userUuid);


    if (!user) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'User not found',
      });
    }

    const employer = await this.employerRepository.findByUserId(user.id);

    if (!employer || !employer.companyLogoUrl) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: LOGO_MESSAGES.LOGO_NOT_FOUND,
      });
    }

    // Return full backend URL for frontend to use
    const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
    const companyLogoUrl = `${backendUrl}${employer.companyLogoUrl}`;

    return { companyLogoUrl };
  }

  async getLogoFile(userUuid) {
    const user = await this.employerRepository.getUserByUuid(userUuid);

    if (!user) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'User not found',
      });
    }

    const employer = await this.employerRepository.findByUserId(user.id);

    if (!employer || !employer.companyLogoUrl) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: LOGO_MESSAGES.LOGO_NOT_FOUND,
      });
    }

    return {
      filePath: employer.companyLogoUrl,
      fileName: employer.companyLogoUrl.split('/').pop(),
    };
  }

  async deleteLogo(userUuid) {
    const user = await this.employerRepository.getUserByUuid(userUuid);

    if (!user) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'User not found',
      });
    }

    const employer = await this.employerRepository.findByUserId(user.id);

    if (!employer || !employer.companyLogoUrl) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: LOGO_MESSAGES.LOGO_NOT_FOUND,
      });
    }

    const filePath = path.join(process.cwd(), employer.companyLogoUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await this.employerRepository.updateLogo(user.id, null);
  }
}

module.exports = new EmployerLogoService();
