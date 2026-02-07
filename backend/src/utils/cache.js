const redis = require('@/config/redis');

const getCache = async (key) => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

const setCache = async (key, value, ttlSeconds) => {
  await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
};

const deleteCache = async (key) => {
  await redis.del(key);
};

module.exports = {
  getCache,
  setCache,
  deleteCache,
};
