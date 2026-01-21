const axios = require("axios");

const getGoogleUser = async (code) => {
  const tokenRes = await axios.post(process.env.GOOGLE_TOKEN_URL, {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    code,
    grant_type: "authorization_code",
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
  });

  const { access_token } = tokenRes.data;

  const userRes = await axios.get(process.env.GOOGLE_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return {
    providerUserId: userRes.data.id,
    email: userRes.data.email,
    name: userRes.data.name,
    avatar: userRes.data.picture,
  };
};

const getGithubUser = async (code) => {
  const tokenRes = await axios.post(
    process.env.GITHUB_TOKEN_URL,
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GITHUB_REDIRECT_URI,
    },
    {
      headers: { Accept: "application/json" },
    },
  );

  const { access_token } = tokenRes.data;

  const profileRes = await axios.get(process.env.GITHUB_USER_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/vnd.github+json",
    },
  });

  const emailRes = await axios.get(process.env.GITHUB_EMAIL_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/vnd.github+json",
    },
  });

  const primaryEmail = emailRes.data.find(
    (e) => e.primary && e.verified,
  )?.email;

  return {
    providerUserId: String(profileRes.data.id),
    email: primaryEmail,
    name: profileRes.data.name || profileRes.data.login,
    avatar: profileRes.data.avatar_url,
  };
};

const getLinkedinUser = async (code) => {
  const tokenRes = await axios.post(process.env.LINKEDIN_TOKEN_URL, null, {
    params: {
      grant_type: "authorization_code",
      code,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
    },
  });

  const { access_token } = tokenRes.data;

  const profileRes = await axios.get(process.env.LINKEDIN_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return {
    providerUserId: profileRes.data.sub,
    email: profileRes.data.email,
    name: profileRes.data.name,
    avatar: profileRes.data.picture,
  };
};

module.exports = {
  getGoogleUser,
  getGithubUser,
  getLinkedinUser,
};
