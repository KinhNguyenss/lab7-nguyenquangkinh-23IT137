const mongoose = require('mongoose');

// Schema định nghĩa cấu trúc Document Character
const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true // Ràng buộc duy nhất cho trường name (Mục 9)
  },
  ultimate: String
});

// Xuất Model Character để sử dụng ở index.js
module.exports = mongoose.model('Character', characterSchema);
