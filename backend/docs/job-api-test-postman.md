# API Test Postman Documentation

## Collections
- **Collection Name:** Job Website API
- **Description:** API hệ thống website việc làm
- **Base URL:** `http://localhost:8000/api/v1`

---
## Folder
- **Name:** Công việc (Job)
- **Description:** Chứa tất cả các điểm cuối API liên quan đến công việc.

---
## Request

### 1. Đăng tin tuyển dụng
- **Method:** POST
- **URL:** `http://localhost:8000/api/v1/job/post`

#### Headers
- **Key:** `Content-Type`
- **Value:** `application/json`
- **Required:** Có
- **Description:** Định dạng nội dung yêu cầu
- **Authorization Headers:** Yêu cầu cookie `token` hợp lệ (từ middleware `isAuthenticated`)

#### Body
- **Format:** Raw JSON
- **Content:**
  ```json
  {
    "title": "Lập trình viên Fullstack",
    "description": "Chúng tôi đang tìm kiếm lập trình viên Fullstack giàu kinh nghiệm",
    "requirements": "Node.js,React,TypeScript,MongoDB",
    "salary": 20000000,
    "location": "Hà Nội",
    "jobType": "Full-time",
    "experience": 2,
    "experienceLevel": "Junior",
    "position": "Fullstack Developer",
    "company": "60d5ec49f1b2c51f3c8e4d2b"
  }
  ```
  > *`requirements` có thể là chuỗi phân cách bởi dấu phẩy hoặc mảng JSON. `experienceLevel` là tuỳ chọn.*

#### Response
- **Success (201 Created):**
  ```json
  {
    "job": {
      "_id": "60d5ec49f1b2c51f3c8e4d2c",
      "title": "Lập trình viên Fullstack",
      "description": "Chúng tôi đang tìm kiếm lập trình viên Fullstack giàu kinh nghiệm",
      "requirements": ["Node.js", "React", "TypeScript", "MongoDB"],
      "salary": 20000000,
      "location": "Hà Nội",
      "jobType": "Full-time",
      "experience": 2,
      "experienceLevel": "Junior",
      "position": "Fullstack Developer",
      "company": "60d5ec49f1b2c51f3c8e4d2b",
      "created_by": "60d5ec49f1b2c51f3c8e4d2a"
    },
    "message": "Đã tạo công việc mới",
    "success": true
  }
  ```
- **Error (400 - Thiếu thông tin):**
  ```json
  {
    "message": "Thiếu thông tin bắt buộc",
    "success": false
  }
  ```
- **Error (401 - Chưa xác thực):**
  ```json
  {
    "message": "Người dùng chưa xác thực",
    "success": false
  }
  ```
- **Error (500 - Lỗi máy chủ):**
  ```json
  {
    "message": "Lỗi máy chủ nội bộ",
    "success": false
  }
  ```

### 2. Lấy tất cả công việc
- **Method:** GET
- **URL:** `http://localhost:8000/api/v1/job/get`
- **Query Params (tuỳ chọn):** `?keyword=lập trình`

#### Headers
- **Authorization Headers:** Không yêu cầu (endpoint công khai)

#### Response
- **Success (200 OK):**
  ```json
  {
    "jobs": [
      {
        "_id": "60d5ec49f1b2c51f3c8e4d2c",
        "title": "Lập trình viên Fullstack",
        "description": "Chúng tôi đang tìm kiếm lập trình viên Fullstack giàu kinh nghiệm",
        "requirements": ["Node.js", "React", "TypeScript", "MongoDB"],
        "salary": 20000000,
        "location": "Hà Nội",
        "jobType": "Full-time",
        "experience": 2,
        "position": "Fullstack Developer",
        "company": {
          "_id": "60d5ec49f1b2c51f3c8e4d2b",
          "name": "Tech Corp"
        },
        "created_by": "60d5ec49f1b2c51f3c8e4d2a"
      }
    ],
    "success": true
  }
  ```
  > *Trường `company` được populate đầy đủ thông tin. Kết quả được sắp xếp theo thời gian tạo giảm dần.*
- **Error (404 - Không tìm thấy):**
  ```json
  {
    "message": "Không tìm thấy công việc",
    "success": false
  }
  ```
- **Error (500 - Lỗi máy chủ):**
  ```json
  {
    "message": "Lỗi máy chủ nội bộ",
    "success": false
  }
  ```

### 3. Lấy công việc của tôi (Admin/Recruiter)
- **Method:** GET
- **URL:** `http://localhost:8000/api/v1/job/getadminjobs`

#### Headers
- **Authorization Headers:** Yêu cầu cookie `token` hợp lệ (từ middleware `isAuthenticated`)

#### Response
- **Success (200 OK):**
  ```json
  {
    "jobs": [
      {
        "_id": "60d5ec49f1b2c51f3c8e4d2c",
        "title": "Lập trình viên Fullstack",
        "description": "Chúng tôi đang tìm kiếm lập trình viên Fullstack giàu kinh nghiệm",
        "requirements": ["Node.js", "React", "TypeScript", "MongoDB"],
        "salary": 20000000,
        "location": "Hà Nội",
        "jobType": "Full-time",
        "experience": 2,
        "position": "Fullstack Developer",
        "company": "60d5ec49f1b2c51f3c8e4d2b",
        "created_by": "60d5ec49f1b2c51f3c8e4d2a"
      }
    ],
    "success": true
  }
  ```
- **Error (404 - Không tìm thấy):**
  ```json
  {
    "message": "Không tìm thấy công việc",
    "success": false
  }
  ```
- **Error (401 - Chưa xác thực):**
  ```json
  {
    "message": "Người dùng chưa xác thực",
    "success": false
  }
  ```
- **Error (500 - Lỗi máy chủ):**
  ```json
  {
    "message": "Lỗi máy chủ nội bộ",
    "success": false
  }
  ```

### 4. Cập nhật công việc
- **Method:** PUT
- **URL:** `http://localhost:8000/api/v1/job/update/:id`

#### Headers
- **Key:** `Content-Type`
- **Value:** `application/json`
- **Required:** Có
- **Description:** Định dạng nội dung yêu cầu
- **Authorization Headers:** Yêu cầu cookie `token` hợp lệ (từ middleware `isAuthenticated`)

#### Body
- **Format:** Raw JSON
- **Content:**
  ```json
  {
    "title": "Lập trình viên Backend",
    "description": "Cập nhật mô tả công việc",
    "salary": 25000000
  }
  ```
  > *Tất cả các trường (title, description, requirements, salary, location, jobType, experience, position, company) đều là tuỳ chọn.*

#### Response
- **Success (200 OK):**
  ```json
  {
    "job": {
      "_id": "60d5ec49f1b2c51f3c8e4d2c",
      "title": "Lập trình viên Backend",
      "description": "Cập nhật mô tả công việc",
      "salary": 25000000,
      "updatedAt": "2026-05-31T..."
    },
    "message": "Công việc đã được cập nhật",
    "success": true
  }
  ```
- **Error (404 - Không tìm thấy công việc):**
  ```json
  {
    "message": "Không tìm thấy công việc",
    "success": false
  }
  ```
- **Error (401 - Chưa xác thực):**
  ```json
  {
    "message": "Người dùng chưa xác thực",
    "success": false
  }
  ```
- **Error (500 - Lỗi máy chủ):**
  ```json
  {
    "message": "Lỗi máy chủ nội bộ",
    "success": false
  }
  ```

### 5. Lấy công việc theo ID
- **Method:** GET
- **URL:** `http://localhost:8000/api/v1/job/get/:id`

#### Headers
- **Authorization Headers:** Không yêu cầu (endpoint công khai)

#### Response
- **Success (200 OK):**
  ```json
  {
    "job": {
      "_id": "60d5ec49f1b2c51f3c8e4d2c",
      "title": "Lập trình viên Fullstack",
      "description": "Chúng tôi đang tìm kiếm lập trình viên Fullstack giàu kinh nghiệm",
      "requirements": ["Node.js", "React", "TypeScript", "MongoDB"],
      "salary": 20000000,
      "location": "Hà Nội",
      "jobType": "Full-time",
      "experience": 2,
      "experienceLevel": "Junior",
      "position": "Fullstack Developer",
      "company": "60d5ec49f1b2c51f3c8e4d2b",
      "created_by": "60d5ec49f1b2c51f3c8e4d2a"
    },
    "success": true
  }
  ```
- **Error (404 - Không tìm thấy):**
  ```json
  {
    "message": "Không tìm thấy công việc",
    "success": false
  }
  ```
- **Error (500 - Lỗi máy chủ):**
  ```json
  {
    "message": "Lỗi máy chủ nội bộ",
    "success": false
  }
  ```

---
## Test Cases

- **Test Case:** Đăng tin tuyển dụng thành công
  - **Input:** Dữ liệu đầy đủ + cookie token hợp lệ
  - **Expected Result:** 201 + thông tin công việc

- **Test Case:** Đăng tin tuyển dụng thiếu thông tin
  - **Input:** Thiếu một trong các trường bắt buộc (title, description, salary, location, jobType, experience, position, company)
  - **Expected Result:** 400 + "Thiếu thông tin bắt buộc"

- **Test Case:** Đăng tin khi chưa đăng nhập
  - **Input:** Không gửi cookie token
  - **Expected Result:** 401 + "Người dùng chưa xác thực"

- **Test Case:** Cập nhật công việc thành công
  - **Input:** ID hợp lệ + dữ liệu cập nhật + cookie token hợp lệ
  - **Expected Result:** 200 + "Công việc đã được cập nhật"

- **Test Case:** Cập nhật công việc với ID không tồn tại
  - **Input:** ID không hợp lệ
  - **Expected Result:** 404 + "Không tìm thấy công việc"

- **Test Case:** Lấy tất cả công việc thành công
  - **Input:** Không yêu cầu xác thực
  - **Expected Result:** 200 + danh sách công việc (có company populated)

- **Test Case:** Lấy tất cả công việc với keyword
  - **Input:** `?keyword=lập trình`
  - **Expected Result:** 200 + danh sách công việc khớp keyword

- **Test Case:** Lấy công việc của admin thành công
  - **Input:** Cookie token hợp lệ
  - **Expected Result:** 200 + danh sách công việc do người dùng tạo

- **Test Case:** Lấy công việc theo ID thành công
  - **Input:** ID hợp lệ
  - **Expected Result:** 200 + thông tin công việc

- **Test Case:** Lấy công việc với ID không tồn tại
  - **Input:** ID không hợp lệ
  - **Expected Result:** 404 + "Không tìm thấy công việc"
