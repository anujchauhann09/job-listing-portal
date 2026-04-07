const { GoogleGenerativeAI } = require('@google/generative-ai');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { RESUME_ANALYZER_MESSAGES } = require('./resume-analyzer.constants');


let _genAI = null;

function getGenAI() {
  if (_genAI) return _genAI;

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new AppException({
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: RESUME_ANALYZER_MESSAGES.API_KEY_MISSING,
    });
  }

  _genAI = new GoogleGenerativeAI(apiKey);
  return _genAI;
}

function getModelName() {
  const model = process.env.GOOGLE_API_MODEL;
  if (!model) {
    throw new AppException({
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: RESUME_ANALYZER_MESSAGES.MODEL_MISSING,
    });
  }
  return model;
}


function buildPrompt(resumeText) {
  const today = new Date().toISOString().split('T')[0];

  return `You are an expert resume reviewer and career coach.
Today's date is ${today}. Use this to accurately evaluate date ranges — any date before today is in the past, any date after today is in the future.
Analyze the following resume text and return a structured JSON response.

RESUME TEXT:
"""
${resumeText}
"""

Return ONLY valid JSON (no markdown, no explanation) with this exact structure:
{
  "score": <number 0-100>,
  "ats": {
    "score": <number 0-100>,
    "isFriendly": <boolean>,
    "issues": [<string>],
    "suggestions": [<string>]
  },
  "keywords": {
    "found": [<string>],
    "missing": [<string>],
    "suggestions": [<string>]
  },
  "format": {
    "score": <number 0-100>,
    "sections": {
      "present": [<string>],
      "missing": [<string>]
    },
    "issues": [<string>],
    "suggestions": [<string>]
  },
  "suggestions": [
    {
      "priority": "high" | "medium" | "low",
      "category": <string>,
      "suggestion": <string>
    }
  ],
  "benchmark": {
    "level": "poor" | "below_average" | "average" | "good" | "excellent",
    "percentile": <number 0-100>,
    "summary": <string>,
    "strengths": [<string>],
    "weaknesses": [<string>]
  }
}`;
}


function parseJsonResponse(raw) {
  const cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    throw new AppException({
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: RESUME_ANALYZER_MESSAGES.ANALYSIS_FAILED,
    });
  }
}


async function analyzeWithGemini(resumeText) {
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({ model: getModelName() });
  const prompt = buildPrompt(resumeText);

  const result = await model.generateContent(prompt);
  const raw = result.response.text();

  return parseJsonResponse(raw);
}

module.exports = { analyzeWithGemini };
