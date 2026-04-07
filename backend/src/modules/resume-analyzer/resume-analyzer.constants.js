const RESUME_ANALYZER_MESSAGES = {
  FILE_REQUIRED:    'Resume file is required',
  INVALID_FILE:     'Invalid file type. Only PDF, DOC, and DOCX are allowed',
  ANALYSIS_SUCCESS: 'Resume analyzed successfully',
  ANALYSIS_FAILED:  'Failed to analyze resume. Please try again.',
  EMPTY_CONTENT:    'Could not extract text from the resume. Ensure the file is not empty or corrupted.',
  API_KEY_MISSING:  'Gemini API key is not configured',
  MODEL_MISSING:    'Gemini model name is not configured',
};

const RESUME_ANALYZER_CONFIG = {
  MIN_TEXT_LENGTH: 50,
};

module.exports = { RESUME_ANALYZER_MESSAGES, RESUME_ANALYZER_CONFIG };
