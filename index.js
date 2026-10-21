require('dotenv').config();
const mongoose = require('mongoose');
const Character = require('./models/Character');

const url = process.env.MONGODB_URI;

// Hằng số nhân vật chính chủ của Master Nguyễn Quang Kính (23IT137)
const CHARACTER_NAME = 'Nguyen Quang Kinh';
const ULTIMATE_SKILL = 'Shinku Hadoken';

// ===============================
// Mục 4: Kết nối MongoDB Atlas
// ===============================
function connectDatabase() {
  if (!url) {
    console.error('Lỗi: MONGODB_URI chưa được cấu hình trong file .env!');
    process.exit(1);
  }
  return mongoose
    .connect(url)
    .then(() => console.log('Database connected'))
    .catch((error) => {
      console.error('Connection error:', error.message || error);
      process.exit(1);
    });
}

// ===============================
// Mục 6: Tạo và lưu Character
// ===============================
async function section6_createAndSave() {
  console.log('\n--- 6. Tạo và lưu Character ---');
  const character = new Character({
    name: CHARACTER_NAME,
    ultimate: ULTIMATE_SKILL
  });
  const doc = await character.save();
  console.log(doc);
  return doc;
}

// ===============================
// Mục 7: Thực hiện bằng Promise
// ===============================
function saveCharacter(character) {
  const c = new Character(character);
  return c.save();
}

async function section7_promise() {
  console.log('\n--- 7. Thực hiện bằng Promise ---');
  await Character.deleteMany({}); // Làm sạch collection trước khi test

  return saveCharacter({
    name: CHARACTER_NAME,
    ultimate: ULTIMATE_SKILL
  })
    .then((doc) => {
      console.log(doc);
      return doc;
    })
    .catch((error) => console.error('Lỗi Promise:', error));
}

// ===============================
// Mục 8: Thực hiện bằng async/await
// ===============================
async function runCode() {
  const ryu = new Character({
    name: CHARACTER_NAME,
    ultimate: ULTIMATE_SKILL
  });
  const doc = await ryu.save();
  console.log(doc);
  return doc;
}

async function section8_asyncAwait() {
  console.log('\n--- 8. Thực hiện bằng async/await ---');
  await Character.deleteMany({}); // Làm sạch collection trước khi test
  return runCode().catch((error) => console.error('Lỗi async/await:', error));
}

// ===============================
// Mục 9: Kiểm tra tính duy nhất của name (unique: true)
// ===============================
async function section9_checkUnique() {
  console.log('\n--- 9. Kiểm tra tính duy nhất của name ---');
  // 1. Xóa toàn bộ dữ liệu cũ và đồng bộ index từ Schema
  await Character.deleteMany({});
  await Character.syncIndexes();

  // 2. Lần lưu đầu tiên -> Thành công
  console.log('[Lần 1] Lưu nhân vật:', CHARACTER_NAME);
  const ryu1 = new Character({
    name: CHARACTER_NAME,
    ultimate: ULTIMATE_SKILL
  });
  const doc1 = await ryu1.save();
  console.log('Kết quả lần 1 (thành công):', doc1);

  // 3. Lần lưu thứ 2 trùng name -> Báo lỗi E11000 duplicate key
  console.log('[Lần 2] Thử lưu nhân vật trùng tên:', CHARACTER_NAME);
  try {
    const ryu2 = new Character({
      name: CHARACTER_NAME,
      ultimate: ULTIMATE_SKILL
    });
    await ryu2.save();
  } catch (error) {
    console.error('Kết quả lần 2 (báo lỗi E11000 trùng lặp):');
    console.error(error.message);
  }
}

// ===============================
// Điều phối chạy chương trình
// ===============================
async function main() {
  await connectDatabase();
  const arg = process.argv[2];

  if (arg === '4') {
    // Mục 4: Chỉ kiểm tra kết nối
    process.exit(0);
  } else if (arg === '6') {
    // Mục 6: Tạo và lưu nhân vật
    await section6_createAndSave();
    process.exit(0);
  } else if (arg === '7') {
    // Mục 7: Lưu bằng Promise
    await section7_promise();
    process.exit(0);
  } else if (arg === '8') {
    // Mục 8: Lưu bằng async/await
    await section8_asyncAwait();
    process.exit(0);
  } else if (arg === '9') {
    // Mục 9: Kiểm tra ràng buộc unique
    await section9_checkUnique();
    process.exit(0);
  } else {
    // Mặc định không truyền tham số: chạy tuần tự tất cả các mục
    console.log('=== CHẠY TOÀN BỘ CÁC MỤC KIỂM THỬ ===');
    await section6_createAndSave();
    await section7_promise();
    await section8_asyncAwait();
    await section9_checkUnique();
    console.log('\n=== HOÀN THÀNH TOÀN BỘ BÀI LAB 7 ===');
    process.exit(0);
  }
}

main();
