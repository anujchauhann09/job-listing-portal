export const isValidName = (name = '') => {
  const trimmed = name.trim();

  if (!trimmed) {
    return {
      isValid: false,
      message: 'Name is required',
    };
  }

  if (trimmed.length < 2) {
    return {
      isValid: false,
      message: 'Name must be at least 2 characters long',
    };
  } else if (trimmed.length > 50) {
    return {
      isValid: false,
      message: 'Name must be at most 50 characters long',
    };
  }

  const nameRegex = /^[A-Za-z ]+$/;

  if (!nameRegex.test(trimmed)) {
    return {
      isValid: false,
      message: 'Name can only contain letters and spaces',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

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
