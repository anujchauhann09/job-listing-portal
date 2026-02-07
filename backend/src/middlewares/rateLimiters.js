const { createRateLimiter } = require('./rateLimiter.middleware');


const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
});



const jobSearchLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 60,
  keyGenerator: (req) => req.user?.id || undefined,
});



const applyJobLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 20,
  keyGenerator: (req) => req.user.id,
});


module.exports = {
  authLimiter,
  jobSearchLimiter,
  applyJobLimiter,
};
