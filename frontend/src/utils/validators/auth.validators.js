import { isValidEmail, validatePasswordStrength } from '@/utils/validators/common.validators';

export const validateLoginForm = ({ email, password }) => {
  const errors = {};

  if (!email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else {
    const { isValid, feedback } = validatePasswordStrength(password);

    if (!isValid) {
      errors.password = `Password must contain: ${feedback.join(', ')}`;
    }
  }

  if (!role) {
    errors.role = 'User role is required';
  }

  return errors;
};


export const validateRegistrationForm = ({ email, password, role }) => {
  const errors = {};

  if (!email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else {
    const { isValid, feedback } = validatePasswordStrength(password);

    if (!isValid) {
      errors.password = `Password must contain: ${feedback.join(', ')}`;
    }
  }

  if (!role) {
    errors.role = 'User role is required';
  }

  return errors;
};
