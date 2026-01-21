const setAuthCookies = (res, { accessToken, refreshToken, user }) => {
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
  });

  if (refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
    });
  }

  res.cookie("user", JSON.stringify(user), {
    httpOnly: false,
    secure: isProd,
    sameSite: "lax",
  });
};

const clearAuthCookies = (res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("user");
};

module.exports = {
  setAuthCookies,
  clearAuthCookies,
};
