const { extractText } = require('./resume-analyzer.extractor');
const { analyzeWithGemini } = require('./resume-analyzer.gemini');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { RESUME_ANALYZER_MESSAGES, RESUME_ANALYZER_CONFIG } = require('./resume-analyzer.constants');

class ResumeAnalyzerService {
  async analyze(file) {
    const text = await extractText(file);

    if (!text || text.trim().length < RESUME_ANALYZER_CONFIG.MIN_TEXT_LENGTH) {
      throw new AppException({
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        message: RESUME_ANALYZER_MESSAGES.EMPTY_CONTENT,
      });
    }

    return analyzeWithGemini(text.trim());
  }
}

module.exports = new ResumeAnalyzerService();
