import { useMemo } from 'react';

export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  suggestions: string[];
}

export function usePasswordStrength(password: string): PasswordStrength {
  return useMemo(() => {
    if (!password) {
      return {
        score: 0,
        label: 'Enter password',
        color: 'text-secondary-500',
        suggestions: ['Password is required'],
      };
    }

    let score = 0;
    const suggestions: string[] = [];

    if (password.length >= 8) {
      score++;
    } else {
      suggestions.push('Use at least 8 characters');
    }

    if (/[A-Z]/.test(password)) {
      score++;
    } else {
      suggestions.push('Add uppercase letters');
    }

    if (/[a-z]/.test(password)) {
      score++;
    } else {
      suggestions.push('Add lowercase letters');
    }

    if (/\d/.test(password)) {
      score++;
    } else {
      suggestions.push('Add numbers');
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score++;
    } else {
      suggestions.push('Add special characters (!@#$%^&*)');
    }

    if (password.length >= 12) {
      score += 0.5;
    } else if (password.length >= 10) {
      score += 0.25;
    }

    const commonPatterns = [
      /123456/,
      /password/i,
      /qwerty/i,
      /abc123/i,
      /(.)\1{2,}/, 
    ];

    const hasCommonPattern = commonPatterns.some(pattern => pattern.test(password));
    if (hasCommonPattern) {
      score -= 1;
      suggestions.push('Avoid common patterns and repeated characters');
    }

    // Ensure score is within bounds
    const finalScore = Math.max(0, Math.min(Math.floor(score), 4));

    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = [
      'text-error-500',
      'text-error-400', 
      'text-warning-500',
      'text-primary-500',
      'text-success-500'
    ];

    return {
      score: finalScore,
      label: labels[finalScore],
      color: colors[finalScore],
      suggestions: finalScore < 4 ? suggestions.slice(0, 3) : [], 
    };
  }, [password]);
}