const multer = require('multer');

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024,
  });

// const upload = multer({ dest: "uploads/" });

  module.exports = {
    Multer,
  };
  