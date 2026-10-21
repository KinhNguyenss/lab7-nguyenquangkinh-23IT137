# Bài thực hành: 7_Mongoose 101 - Điện toán đám mây

- **Sinh viên thực hiện**: Nguyễn Quang Kính
- **Mã sinh viên**: 23IT137
- **Tên Project**: `7_lab_mongoose_23IT137`
- **Database**: `7_lab_mongoose_23IT137`

---

## 1. Cấu trúc Project
```text
7_lab_mongoose_23IT137/
├── index.js
├── models/
│   └── Character.js
├── package.json
├── .env
├── .env.example
└── .gitignore
```

---

## 2. Cài đặt thư viện
```bash
npm install
```

---

## 3. Cấu hình biến môi trường
Mở file `.env` và dán chuỗi kết nối MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/7_lab_mongoose_23IT137?retryWrites=true&w=majority
```

---

## 4. Các lệnh chạy tương ứng với các mục báo cáo

- **Mục 4 (Kết nối Atlas)**:
  ```bash
  node index.js 4
  ```
- **Mục 6 (Tạo và lưu Character)**:
  ```bash
  node index.js 6
  ```
- **Mục 7 (Thực hiện bằng Promise)**:
  ```bash
  node index.js 7
  ```
- **Mục 8 (Thực hiện bằng async/await)**:
  ```bash
  node index.js 8
  ```
- **Mục 9 (Kiểm tra unique constraint)**:
  ```bash
  node index.js 9
  ```
- **Chạy toàn bộ cùng lúc**:
  ```bash
  node index.js
  ```
