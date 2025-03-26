// Load environment variables
const envVars = {
  FULL_RESUME_WEBHOOK: process.env.FULL_RESUME_WEBHOOK || '',
  COVER_LETTER_RESUME_WEBHOOK: process.env.COVER_LETTER_RESUME_WEBHOOK || '',
  STANDALONE_COVER_LETTER_WEBHOOK: process.env.STANDALONE_COVER_LETTER_WEBHOOK || ''
};

// Export environment variables
export default envVars;