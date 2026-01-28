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
    const employer = await this.employerRepository.findByUserId(user.id);

    if (!employer || employer.isDeleted) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: EMPLOYER_MESSAGES.PROFILE_NOT_FOUND,
      });
    }

    if (employer.companyLogoUrl) {
      const oldPath = path.join(process.cwd(), employer.companyLogoUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const logoUrl = `/uploads/logos/${file.filename}`;
    await this.employerRepository.updateLogo(user.id, logoUrl);

    return { companyLogoUrl: logoUrl };
  }

  async getLogo(userUuid) {
    const user = await this.employerRepository.getUserByUuid(userUuid);
    const employer = await this.employerRepository.findByUserId(user.id);

    if (!employer || !employer.companyLogoUrl) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: LOGO_MESSAGES.LOGO_NOT_FOUND,
      });
    }

    return { companyLogoUrl: employer.companyLogoUrl };
  }

  async getLogoFile(userUuid) {
    const user = await this.employerRepository.getUserByUuid(userUuid);
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
