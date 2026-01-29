const prisma = require('@/config/prisma');

class SkillRepository {
  findByNames(tx, names) {
    return tx.skill.findMany({
      where: {
        name: { in: names }
      },
      select: { id: true, name: true }
    });
  }

  createMany(tx, names) {
    return tx.skill.createMany({
      data: names.map(name => ({ name })),
      skipDuplicates: true
    });
  }
}

module.exports = new SkillRepository();
