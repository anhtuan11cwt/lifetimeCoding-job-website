# API Test Postman Documentation

## Collections
- **Collection Name:** Job Website API
- **Description:** API hệ thống website việc làm
- **Base URL:** `http://localhost:8000/api/v1`

---
## Folder
- **Name:** Công ty (Company)
- **Description:** Chứa tất cả các điểm cuối API liên quan đến công ty.

---
## Request

### 1. Đăng ký công ty
- **Method:** POST
- **URL:** `http://localhost:8000/api/v1/company/register`

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
    "companyName": "Tech Corp"
  }
  ```

#### Response
- **Success (201 Created):**
  ```json
  {
    "company": {
      "_id": "60d5ec49f1b2c51f3c8e4d2b",
      "name": "Tech Corp",
      "userId": "60d5ec49f1b2c51f3c8e4d2a"
    },
    "message": "Đăng ký công ty thành công",
    "success": true
  }
  ```
- **Error (400 - Thiếu tên công ty):**
  ```json
  {
    "message": "Tên công ty là bắt buộc",
    "success": false
  }
  ```
- **Error (400 - Tên công ty đã tồn tại):**
  ```json
  {
    "message": "Bạn không thể đăng ký cùng một công ty",
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

### 2. Lấy danh sách công ty
- **Method:** GET
- **URL:** `http://localhost:8000/api/v1/company/get`

#### Headers
- **Authorization Headers:** Yêu cầu cookie `token` hợp lệ (từ middleware `isAuthenticated`)

#### Response
- **Success (200 OK):**
  ```json
  {
    "companies": [
      {
        "_id": "60d5ec49f1b2c51f3c8e4d2b",
        "name": "Tech Corp",
        "userId": "60d5ec49f1b2c51f3c8e4d2a"
      }
    ],
    "success": true
  }
  ```
- **Error (404 - Không tìm thấy):**
  ```json
  {
    "message": "Không tìm thấy công ty",
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

### 3. Lấy thông tin công ty theo ID
- **Method:** GET
- **URL:** `http://localhost:8000/api/v1/company/get/:id`

#### Headers
- **Authorization Headers:** Yêu cầu cookie `token` hợp lệ (từ middleware `isAuthenticated`)

#### Response
- **Success (200 OK):**
  ```json
  {
    "company": {
      "_id": "60d5ec49f1b2c51f3c8e4d2b",
      "name": "Tech Corp",
      "userId": "60d5ec49f1b2c51f3c8e4d2a",
      "description": "",
      "website": "",
      "location": ""
    },
    "success": true
  }
  ```
- **Error (404 - Không tìm thấy):**
  ```json
  {
    "message": "Không tìm thấy công ty",
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

### 4. Cập nhật thông tin công ty
- **Method:** PUT
- **URL:** `http://localhost:8000/api/v1/company/update/:id`

#### Headers
- **Key:** `Content-Type`
- **Value:** `application/json`
- **Required:** Có
- **Authorization Headers:** Yêu cầu cookie `token` hợp lệ (từ middleware `isAuthenticated`)

#### Body
- **Format:** Raw JSON
- **Content:**
  ```json
  {
    "name": "Tech Corp Updated",
    "description": "Công ty công nghệ hàng đầu",
    "website": "https://techcorp.com",
    "location": "Hà Nội"
  }
  ```
  > *Tất cả các trường đều là tuỳ chọn.*

#### Response
- **Success (200 OK):**
  ```json
  {
    "company": {
      "_id": "60d5ec49f1b2c51f3c8e4d2b",
      "name": "Tech Corp Updated",
      "description": "Công ty công nghệ hàng đầu",
      "website": "https://techcorp.com",
      "location": "Hà Nội",
      "userId": "60d5ec49f1b2c51f3c8e4d2a"
    },
    "message": "Thông tin đã được cập nhật",
    "success": true
  }
  ```
- **Error (404 - Không tìm thấy):**
  ```json
  {
    "message": "Không tìm thấy công ty",
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

---
## Test Cases

- **Test Case:** Đăng ký công ty thành công
  - **Input:** companyName hợp lệ + cookie token hợp lệ
  - **Expected Result:** 201 + thông tin công ty

- **Test Case:** Đăng ký công ty thiếu tên
  - **Input:** Không gửi companyName
  - **Expected Result:** 400 + "Tên công ty là bắt buộc"

- **Test Case:** Đăng ký công ty trùng tên
  - **Input:** companyName đã tồn tại
  - **Expected Result:** 400 + "Bạn không thể đăng ký cùng một công ty"

- **Test Case:** Lấy danh sách công ty thành công
  - **Input:** Cookie token hợp lệ
  - **Expected Result:** 200 + danh sách công ty

- **Test Case:** Lấy danh sách công ty khi chưa đăng nhập
  - **Input:** Không gửi cookie token
  - **Expected Result:** 401 + "Người dùng chưa xác thực"

- **Test Case:** Lấy công ty theo ID thành công
  - **Input:** ID hợp lệ + cookie token hợp lệ
  - **Expected Result:** 200 + thông tin công ty

- **Test Case:** Lấy công ty với ID không tồn tại
  - **Input:** ID không hợp lệ
  - **Expected Result:** 404 + "Không tìm thấy công ty"

- **Test Case:** Cập nhật công ty thành công
  - **Input:** ID hợp lệ + dữ liệu cập nhật + cookie token hợp lệ
  - **Expected Result:** 200 + thông tin đã cập nhật

- **Test Case:** Cập nhật công ty với ID không tồn tại
  - **Input:** ID không hợp lệ
  - **Expected Result:** 404 + "Không tìm thấy công ty"

- **Test Case:** Cập nhật công ty khi chưa đăng nhập
  - **Input:** Không gửi cookie token
  - **Expected Result:** 401 + "Người dùng chưa xác thực"
