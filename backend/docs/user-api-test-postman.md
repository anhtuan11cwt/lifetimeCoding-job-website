# API Test Postman Documentation

## Collections
- **Collection Name:** Job Website API
- **Description:** API hệ thống website việc làm
- **Base URL:** `http://localhost:8000/api/v1`

---
## Folder
- **Name:** Người dùng (User)
- **Description:** Chứa tất cả các điểm cuối API liên quan đến người dùng.

---
## Request

### 1. Đăng ký người dùng
- **Method:** POST
- **URL:** `http://localhost:8000/api/v1/user/register`

#### Headers
- **Key:** `Content-Type`
- **Value:** `application/json`
- **Required:** Có
- **Description:** Định dạng nội dung yêu cầu
- **Authorization Headers:** Không yêu cầu

#### Body
- **Format:** Raw JSON
- **Content:**
  ```json
  {
    "fullName": "Nguyen Van A",
    "email": "example@gmail.com",
    "phoneNumber": "0123456789",
    "password": "password123",
    "role": "student"
  }
  ```

#### Response
- **Success (201 Created):**
  ```json
  {
    "message": "Tạo tài khoản thành công",
    "success": true,
    "user": {
      "_id": "60d5ec49f1b2c51f3c8e4d2a",
      "email": "example@gmail.com",
      "fullName": "Nguyen Van A",
      "phoneNumber": "0123456789",
      "role": "student"
    }
  }
  ```
- **Error (400 - Thiếu thông tin):**
  ```json
  {
    "message": "Thiếu thông tin",
    "success": false
  }
  ```
- **Error (400 - Email đã tồn tại):**
  ```json
  {
    "message": "Người dùng đã tồn tại với email này",
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

### 2. Đăng nhập người dùng
- **Method:** POST
- **URL:** `http://localhost:8000/api/v1/user/login`

#### Headers
- **Key:** `Content-Type`
- **Value:** `application/json`
- **Required:** Có
- **Description:** Định dạng nội dung yêu cầu
- **Authorization Headers:** Không yêu cầu

#### Body
- **Format:** Raw JSON
- **Content:**
  ```json
  {
    "email": "example@gmail.com",
    "password": "password123",
    "role": "student"
  }
  ```

#### Response
- **Success (200 OK):**
  - **Set-Cookie:**
    - `token=<JWT_TOKEN>; HttpOnly; Max-Age=86400` (1 ngày)
  - **Body:**
    ```json
    {
      "message": "Chào mừng Nguyen Van A đã quay trở lại",
      "success": true,
      "user": {
        "_id": "60d5ec49f1b2c51f3c8e4d2a",
        "email": "example@gmail.com",
        "fullName": "Nguyen Van A",
        "phoneNumber": "0123456789",
        "profile": {
          "bio": "",
          "skills": []
        },
        "role": "student"
      }
    }
    ```
- **Error (400 - Thiếu thông tin):**
  ```json
  {
    "message": "Thiếu thông tin",
    "success": false
  }
  ```
- **Error (400 - Sai email hoặc mật khẩu):**
  ```json
  {
    "message": "Email hoặc mật khẩu không hợp lệ",
    "success": false
  }
  ```
- **Error (400 - Sai vai trò):**
  ```json
  {
    "message": "Tài khoản không tồn tại với vai trò này",
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

### 3. Đăng xuất người dùng
- **Method:** POST
- **URL:** `http://localhost:8000/api/v1/user/logout`

#### Headers / Cookies
- **Authorization Headers:** Không yêu cầu

#### Response
- **Success (200 OK):**
  - **Set-Cookie:** Xoá cookie `token` bằng cách đặt `Max-Age=0`
  - **Body:**
    ```json
    {
      "message": "Đăng xuất thành công",
      "success": true
    }
    ```
- **Error (500 - Lỗi máy chủ):**
  ```json
  {
    "message": "Lỗi máy chủ nội bộ",
    "success": false
  }
  ```

### 4. Cập nhật hồ sơ người dùng
- **Method:** POST
- **URL:** `http://localhost:8000/api/v1/user/profile/update`

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
    "fullName": "Nguyen Van B",
    "email": "newemail@gmail.com",
    "phoneNumber": "0987654321",
    "bio": "Developer",
    "skills": "JavaScript,Node.js,React"
  }
  ```
  > *Trường `bio` và `skills` là tuỳ chọn. `skills` là chuỗi phân cách bởi dấu phẩy.*

#### Response
- **Success (200 OK):**
  ```json
  {
    "message": "Cập nhật hồ sơ thành công",
    "success": true,
    "user": {
      "_id": "60d5ec49f1b2c51f3c8e4d2a",
      "email": "newemail@gmail.com",
      "fullName": "Nguyen Van B",
      "phoneNumber": "0987654321",
      "profile": {
        "bio": "Developer",
        "skills": ["JavaScript", "Node.js", "React"]
      },
      "role": "student"
    }
  }
  ```
- **Error (400 - Thiếu thông tin bắt buộc):**
  ```json
  {
    "message": "Thiếu thông tin",
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
- **Error (401 - Token không hợp lệ):**
  ```json
  {
    "message": "Mã token không hợp lệ",
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

- **Test Case:** Đăng ký hợp lệ
  - **Input:** fullName, email, phoneNumber, password, role hợp lệ
  - **Expected Result:** 201 + thông tin user

- **Test Case:** Đăng ký thiếu thông tin
  - **Input:** Thiếu một trong các trường bắt buộc
  - **Expected Result:** 400 + "Thiếu thông tin"

- **Test Case:** Đăng ký với email đã tồn tại
  - **Input:** Email đã được đăng ký trước đó
  - **Expected Result:** 400 + "Người dùng đã tồn tại với email này"

- **Test Case:** Đăng nhập thành công
  - **Input:** Email, password, role chính xác
  - **Expected Result:** 200 + thông tin user + set cookie `token`

- **Test Case:** Đăng nhập sai mật khẩu
  - **Input:** Email đúng, password sai
  - **Expected Result:** 400 + "Email hoặc mật khẩu không hợp lệ"

- **Test Case:** Đăng nhập sai vai trò
  - **Input:** Email đúng, password đúng, role không khớp
  - **Expected Result:** 400 + "Tài khoản không tồn tại với vai trò này"

- **Test Case:** Đăng xuất thành công
  - **Input:** Gửi request đến /logout
  - **Expected Result:** 200 + "Đăng xuất thành công" + xoá cookie

- **Test Case:** Cập nhật hồ sơ thành công
  - **Input:** Cookie token hợp lệ + dữ liệu cập nhật
  - **Expected Result:** 200 + thông tin user đã cập nhật

- **Test Case:** Cập nhật hồ sơ khi chưa đăng nhập
  - **Input:** Không gửi cookie token
  - **Expected Result:** 401 + "Người dùng chưa xác thực"

- **Test Case:** Cập nhật hồ sơ thiếu thông tin
  - **Input:** Thiếu fullName, email hoặc phoneNumber
  - **Expected Result:** 400 + "Thiếu thông tin"
