const multer = require('multer');
const path = require('path');

// Настройка хранилища для multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Папка для хранения изображений
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname); // Получаем расширение файла
    cb(null, Date.now() + fileExtension); // Используем текущее время как имя файла
  },
});

// Инициализируем multer с настройками
const upload = multer({ storage });

module.exports = upload;
