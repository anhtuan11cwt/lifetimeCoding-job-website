# API Test Postman Documentation

## Collections
- **Collection Name:** Job Website API
- **Description:** API hệ thống website việc làm
- **Base URL:** `http://localhost:8000/api/v1`

---
## Folder
- **Name:** Ứng tuyển (Application)
- **Description:** Chứa tất cả các điểm cuối API liên quan đến ứng tuyển công việc.

---
## Request

### 1. Ứng tuyển công việc
- **Method:** GET
- **URL:** `http://localhost:8000/api/v1/application/apply/:id`

#### Headers
- **Authorization Headers:** Yêu cầu cookie `token` hợp lệ (từ middleware `isAuthenticated`)

#### Response
- **Success (201 Created):**
  ```json
  {
    "application": {
      "_id": "60d5ec49f1b2c51f3c8e4d2d",
      "job": "60d5ec49f1b2c51f3c8e4d2c",
      "applicant": "60d5ec49f1b2c51f3c8e4d2a",
      "status": "pending"
    },
    "message": "Job applied successfully",
    "success": true
  }
  ```
- **Error (400 - Đã ứng tuyển):**
  ```json
  {
    "message": "You have already applied for this job",
    "success": false
  }
  ```
- **Error (404 - Không tìm thấy công việc):**
  ```json
  {
    "message": "Job not found",
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
    "message": "Internal server error",
    "success": false
  }
  ```

### 2. Lấy danh sách công việc đã ứng tuyển
- **Method:** GET
- **URL:** `http://localhost:8000/api/v1/application/get`

#### Headers
- **Authorization Headers:** Yêu cầu cookie `token` hợp lệ (từ middleware `isAuthenticated`)

#### Response
- **Success (200 OK):**
  ```json
  {
    "applications": [
      {
        "_id": "60d5ec49f1b2c51f3c8e4d2d",
        "job": {
          "_id": "60d5ec49f1b2c51f3c8e4d2c",
          "title": "Lập trình viên Fullstack",
          "description": "Chúng tôi đang tìm kiếm lập trình viên Fullstack giàu kinh nghiệm",
          "company": {
            "_id": "60d5ec49f1b2c51f3c8e4d2b",
            "name": "Tech Corp"
          }
        },
        "applicant": "60d5ec49f1b2c51f3c8e4d2a",
        "status": "pending"
      }
    ],
    "success": true
  }
  ```
  > *Trường `job` được populate đầy đủ, bao gồm cả thông tin `company`. Kết quả được sắp xếp theo thời gian tạo giảm dần.*
- **Error (404 - Không có ứng tuyển):**
  ```json
  {
    "message": "No applications",
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
    "message": "Internal server error",
    "success": false
  }
  ```

### 3. Lấy danh sách ứng viên của công việc
- **Method:** GET
- **URL:** `http://localhost:8000/api/v1/application/:id/applicants`

#### Headers
- **Authorization Headers:** Yêu cầu cookie `token` hợp lệ (từ middleware `isAuthenticated`)

#### Response
- **Success (200 OK):**
  ```json
  {
    "job": {
      "_id": "60d5ec49f1b2c51f3c8e4d2c",
      "title": "Lập trình viên Fullstack",
      "applications": [
        {
          "_id": "60d5ec49f1b2c51f3c8e4d2d",
          "applicant": {
            "_id": "60d5ec49f1b2c51f3c8e4d2a",
            "fullName": "Nguyen Van A",
            "email": "example@gmail.com",
            "phoneNumber": "0123456789"
          },
          "status": "pending"
        }
      ]
    },
    "success": true
  }
  ```
  > *Danh sách ứng viên được sắp xếp theo thời gian ứng tuyển giảm dần.*
- **Error (404 - Không tìm thấy công việc):**
  ```json
  {
    "message": "Job not found",
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
    "message": "Internal server error",
    "success": false
  }
  ```

### 4. Cập nhật trạng thái ứng tuyển
- **Method:** POST
- **URL:** `http://localhost:8000/api/v1/application/status/:id/update`

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
    "status": "accepted"
  }
  ```
  > *Giá trị `status` có thể là: `pending`, `accepted`, `rejected`.*

#### Response
- **Success (200 OK):**
  ```json
  {
    "message": "Status updated successfully",
    "success": true
  }
  ```
- **Error (400 - Thiếu trạng thái):**
  ```json
  {
    "message": "Status is required",
    "success": false
  }
  ```
- **Error (404 - Không tìm thấy đơn ứng tuyển):**
  ```json
  {
    "message": "Application not found",
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
    "message": "Internal server error",
    "success": false
  }
  ```

---
## Test Cases

- **Test Case:** Ứng tuyển công việc thành công
  - **Input:** ID công việc hợp lệ + cookie token hợp lệ
  - **Expected Result:** 201 + thông tin application

- **Test Case:** Ứng tuyển công việc đã ứng tuyển trước đó
  - **Input:** ID công việc đã ứng tuyển
  - **Expected Result:** 400 + "You have already applied for this job"

- **Test Case:** Ứng tuyển công việc không tồn tại
  - **Input:** ID công việc không hợp lệ
  - **Expected Result:** 404 + "Job not found"

- **Test Case:** Ứng tuyển khi chưa đăng nhập
  - **Input:** Không gửi cookie token
  - **Expected Result:** 401 + "Người dùng chưa xác thực"

- **Test Case:** Lấy danh sách đã ứng tuyển thành công
  - **Input:** Cookie token hợp lệ
  - **Expected Result:** 200 + danh sách ứng tuyển (có job + company populated)

- **Test Case:** Lấy danh sách đã ứng tuyển khi chưa có ứng tuyển nào
  - **Input:** Cookie token hợp lệ (user chưa apply job nào)
  - **Expected Result:** 404 + "No applications"

- **Test Case:** Lấy danh sách ứng viên thành công
  - **Input:** ID công việc hợp lệ + cookie token hợp lệ
  - **Expected Result:** 200 + danh sách ứng viên (có thông tin applicant)

- **Test Case:** Lấy danh sách ứng viên với ID không tồn tại
  - **Input:** ID công việc không hợp lệ
  - **Expected Result:** 404 + "Job not found"

- **Test Case:** Cập nhật trạng thái ứng tuyển thành công
  - **Input:** ID application hợp lệ + status mới + cookie token hợp lệ
  - **Expected Result:** 200 + "Status updated successfully"

- **Test Case:** Cập nhật trạng thái thiếu status
  - **Input:** Không gửi trường status
  - **Expected Result:** 400 + "Status is required"

- **Test Case:** Cập nhật trạng thái với ID không tồn tại
  - **Input:** ID application không hợp lệ
  - **Expected Result:** 404 + "Application not found"
