const prisma = require('@/config/prisma');

class EmployerRepository {
  async getUserByUuid(uuid) {
    return prisma.user.findUnique({
      where: { uuid },
      select: { id: true },
    });
  }

  async findByUserId(userId) {
    return prisma.employer.findUnique({
      where: { userId },
      select: {
        uuid: true,
        companyDescription: true,
        companySize: true,
        industry: true,
        website: true,
        headquartersCity: true,
        headquartersCountry: true,
        companyLogoUrl: true,
      },
    });
  }

  async create(data) {
    return prisma.employer.create({
      data,
      select: {
        uuid: true,
        companyDescription: true,
        companySize: true,
        industry: true,
        website: true,
        headquartersCity: true,
        headquartersCountry: true,
        companyLogoUrl: true,
      },
    });
  }

  async updateByUserId(userId, data) {
    await prisma.employer.update({
      where: { userId },
      data,
    });

    return this.findByUserId(userId);
  }

  async findBySlug(slug) {
    return prisma.employer.findFirst({
      where: {
        OR: [
          { website: { contains: slug, mode: 'insensitive' } },
          { industry: { contains: slug, mode: 'insensitive' } },
        ],
      },
      select: {
        companyDescription: true,
        industry: true,
        website: true,
        companySize: true,
        headquartersCity: true,
        headquartersCountry: true,
        companyLogoUrl: true,
      },
    });
  }

  async updateLogo(userId, companyLogoUrl) {
    await prisma.employer.update({
      where: { userId },
      data: { companyLogoUrl },
    });

    return { companyLogoUrl };
  }
}

module.exports = EmployerRepository;
