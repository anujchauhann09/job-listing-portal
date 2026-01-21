const oauthService = require('./oauth.service');
const { setAuthCookies } = require('@/utils/authCookies.util');

const redirectToProvider = async (req, res, next) => {
  try {
    const { provider } = req.params;
    const { role } = req.query;

    const redirectUrl = oauthService.getAuthorizationUrl(provider, role);
    return res.redirect(redirectUrl);
  } catch (err) {
    next(err);
  }
};

const handleCallback = async (req, res, next) => {
  try {
    const { provider } = req.params;
    const result = await oauthService.handleOAuthCallback(provider, req.query);

    setAuthCookies(res, result);

    return res.redirect(
      `${process.env.FRONTEND_URL}/auth/oauth/success?token=${result.accessToken}`
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  redirectToProvider,
  handleCallback
};
