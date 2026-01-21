export const getUserFromCookie = () => {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user="));

  if (!match) return null;

  try {
    return JSON.parse(decodeURIComponent(match.split("=")[1]));
  } catch {
    return null;
  }
};
