const FILE_CONSTANTS = {
  RESUME: {
    UPLOAD_DIR: "uploads/resumes",
    MAX_SIZE_MB: 5,
    ALLOWED_MIME_TYPES: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },

  LOGO: {
    UPLOAD_DIR: "uploads/logos",
    MAX_SIZE_MB: 2,
    ALLOWED_MIME_TYPES: ["image/png", "image/jpeg", "image/webp"],
  },

  AVATAR: {
    UPLOAD_DIR: "uploads/avatars",
    MAX_SIZE_MB: 1,
    ALLOWED_MIME_TYPES: ["image/png", "image/jpeg", "image/webp"],
  },
};


module.exports = { FILE_CONSTANTS };
