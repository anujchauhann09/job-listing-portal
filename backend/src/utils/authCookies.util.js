const tokenCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

const userCookieOptions = {
  httpOnly: false, 
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

const setAuthCookies = (res, { accessToken, refreshToken }) => {
  res.cookie("accessToken", accessToken, tokenCookieOptions);
  res.cookie("refreshToken", refreshToken, tokenCookieOptions);

  // res.cookie("user", JSON.stringify(user), userCookieOptions);
};

const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", tokenCookieOptions);
  res.clearCookie("refreshToken", tokenCookieOptions);
  // res.clearCookie("user", userCookieOptions);
};

module.exports = {
  setAuthCookies,
  clearAuthCookies,
};
