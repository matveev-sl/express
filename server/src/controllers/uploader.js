const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname); // Получаем расширение файла
    cb(null, Date.now() + fileExtension); // Используем текущее время как имя файла
  },
});

const upload = multer({ storage });

module.exports = upload;
