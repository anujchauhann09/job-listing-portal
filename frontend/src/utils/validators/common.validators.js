export const isValidEmail = (email = '') => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePasswordStrength = (password = '') => {
  const feedback = [];

  if (password.length < 8) feedback.push('At least 8 characters');
  if (!/[a-z]/.test(password)) feedback.push('One lowercase letter');
  if (!/[A-Z]/.test(password)) feedback.push('One uppercase letter');
  if (!/[0-9]/.test(password)) feedback.push('One number');
  if (!/[!@#$%^&*]/.test(password)) feedback.push('One special character');

  return {
    isValid: feedback.length === 0,
    feedback,
  };
};
