const skillRepository = require('./skill.repository');

class SkillService {
  async resolveSkillIds(tx, skills) {
    if (!Array.isArray(skills) || skills.length === 0) {
      return [];
    }

    const normalized = [
      ...new Set(skills.map(s => s.trim().toLowerCase()))
    ];

    const existing = await skillRepository.findByNames(tx, normalized);

    const existingMap = new Map(
      existing.map(s => [s.name, s.id])
    );

    const missing = normalized.filter(
      name => !existingMap.has(name)
    );

    if (missing.length) {
      await skillRepository.createMany(tx, missing);
    }

    const resolved = await skillRepository.findByNames(tx, normalized);

    return resolved.map(s => s.id);
  }
}

module.exports = new SkillService();
