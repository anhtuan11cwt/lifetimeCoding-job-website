# Lifetime Coding Job Website

Lifetime Coding Job Website là ứng dụng web tuyển dụng full-stack được xây dựng với **React (Vite)** phía frontend và **Node.js (Express)** phía backend, sử dụng **MongoDB** làm cơ sở dữ liệu. Ứng dụng hỗ trợ xác thực người dùng, duyệt và tìm kiếm việc làm, quản lý đơn ứng tuyển, quản lý công ty, và dashboard quản trị.

**Tác giả:** Trần Anh Tuấn

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **shadcn/ui** (Radix UI) | Accessible, reusable UI components |
| **Redux Toolkit** | State management |
| **Redux Persist** | Persistent state across sessions |
| **React Router DOM v7** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **Embla Carousel** | Carousel/slider component |
| **Lucide React** | Icon library |
| **Sonner** | Toast notifications |
| **Recharts** | Charting & data visualization |
| **Biome / ESLint** | Linting & formatting |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **MongoDB + Mongoose 9** | NoSQL database & ODM |
| **JWT (jsonwebtoken)** | Authentication & authorization |
| **bcryptjs** | Password hashing |
| **Cloudinary** | Image/file upload storage |
| **Multer** | File upload handling |
| **Cookie-parser** | Cookie-based token management |
| **CORS** | Cross-Origin Resource Sharing |
| **Nodemon** | Dev server auto-restart |
| **Biome / ESLint** | Linting & formatting |

---

## Project Structure

```
lifetimeCoding-job-website/
├── backend/                    # Express.js API server
│   ├── config/                 # Configuration files (empty, uses .env)
│   ├── controllers/            # Route handlers / business logic
│   │   ├── application.controller.js
│   │   ├── company.controller.js
│   │   ├── job.controller.js
│   │   └── user.controller.js
│   ├── docs/                   # API documentation / Postman collections
│   │   ├── application-api-test-postman.md
│   │   ├── company-api-test-postman.md
│   │   ├── job-api-test-postman.md
│   │   └── user-api-test-postman.md
│   ├── middlewares/             # Express middlewares
│   │   ├── isAuthenticated.js   # JWT verification middleware
│   │   └── multer.js            # File upload middleware (Cloudinary)
│   ├── models/                  # Mongoose schemas & models
│   │   ├── application.model.js
│   │   ├── company.model.js
│   │   ├── job.model.js
│   │   └── user.model.js
│   ├── repositories/           # Data access layer (empty, uses controllers directly)
│   ├── routes/                  # Express route definitions
│   │   ├── application.route.js
│   │   ├── company.route.js
│   │   ├── job.route.js
│   │   └── user.route.js
│   ├── services/               # Business logic layer (empty)
│   ├── types/                  # Type definitions (empty)
│   ├── utils/                  # Utility modules
│   │   ├── cloudinary.js        # Cloudinary upload configuration
│   │   └── db.js                # MongoDB connection setup
│   ├── .env.example             # Environment variables template
│   ├── index.js                 # Application entry point
│   └── package.json
│
├── frontend/                   # React SPA (Vite)
│   ├── public/                 # Static assets
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/             # Images & static resources
│   │   │   ├── hero.png
│   │   │   └── ...
│   │   ├── components/         # React components
│   │   │   ├── admin/          # Admin dashboard components
│   │   │   │   ├── AdminJobs.jsx
│   │   │   │   ├── AdminJobsTable.jsx
│   │   │   │   ├── Applicants.jsx
│   │   │   │   ├── ApplicantsTable.jsx
│   │   │   │   ├── Companies.jsx
│   │   │   │   ├── CompaniesTable.jsx
│   │   │   │   ├── CompanyCreate.jsx
│   │   │   │   ├── CompanySetup.jsx
│   │   │   │   ├── JobSetup.jsx
│   │   │   │   └── PostJob.jsx
│   │   │   ├── auth/           # Authentication components
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── shared/         # Shared/reusable components
│   │   │   ├── ui/             # shadcn/ui primitive components
│   │   │   ├── AppliedJobTable.jsx
│   │   │   ├── Browse.jsx
│   │   │   ├── CategoryCarousel.jsx
│   │   │   ├── FilterCard.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Job.jsx
│   │   │   ├── JobDescription.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── LatestJobCards.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── UpdateProfileDialog.jsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useGetAllAdminJobs.jsx
│   │   │   ├── useGetAllCompanies.jsx
│   │   │   ├── useGetAllJobs.jsx
│   │   │   ├── useGetAppliedJobs.jsx
│   │   │   ├── useGetCompanyById.jsx
│   │   │   └── useGetJobById.jsx
│   │   ├── lib/                # Library utilities
│   │   │   └── utils.js        # Tailwind class merging (cn util)
│   │   ├── redux/              # Redux state management slices
│   │   │   ├── applicationSlice.js
│   │   │   ├── authSlice.js
│   │   │   ├── companySlice.js
│   │   │   ├── jobSlice.js
│   │   │   └── store.js
│   │   ├── utils/              # Frontend utility modules
│   │   │   ├── constants.js    # API base URL & constants
│   │   │   └── format.js       # Date/currency formatting helpers
│   │   ├── App.jsx             # Root component with routing
│   │   ├── index.css           # Global styles (Tailwind)
│   │   └── main.jsx            # Application entry point
│   ├── .env.production         # Production environment variables
│   ├── index.html               # Vite entry HTML
│   ├── vite.config.js           # Vite configuration
│   └── package.json
│
├── .gitignore
└── README.md                    # This file
```

---

## Tính năng chính

### Xác thực & Quản lý người dùng
- **Đăng ký & Đăng nhập** với email/password, bảo mật bằng JWT token lưu trong HTTP-only cookies
- **Phân quyền vai trò**: luồng riêng biệt cho Job Seeker và Recruiter/Admin
- **Quản lý hồ sơ**: cập nhật thông tin cá nhân, tải ảnh đại diện qua Cloudinary, tải CV/Resume
- **Protected routes**: chỉ người dùng đã xác thực mới có thể truy cập một số trang

### Quản lý việc làm
- **Đăng tin tuyển dụng**: Nhà tuyển dụng có thể tạo, chỉnh sửa và quản lý tin tuyển dụng
- **Duyệt việc làm**: Xem tất cả các công việc có sẵn với bộ lọc và tìm kiếm
- **Trang chi tiết công việc**: Xem đầy đủ mô tả công việc, thông tin công ty, yêu cầu tuyển dụng
- **Danh mục**: Công việc được phân loại theo danh mục (Engineering, Marketing, Finance, Design, Sales,...) với carousel trực quan
- **Việc làm mới nhất**: Hiển thị các vị trí tuyển dụng mới đăng trên trang chủ

### Tìm kiếm & Lọc
- **Tìm kiếm theo từ khóa**: Tìm việc theo tiêu đề, mô tả, hoặc tên công ty
- **Bộ lọc theo**: Địa điểm, ngành nghề, mức lương, hình thức làm việc (Full-time, Part-time, Internship, Contract)
- **Filter sidebar**: Bảng điều khiển bộ lọc tương tác giúp thu hẹp kết quả tìm kiếm

### Quản lý đơn ứng tuyển
- **Ứng tuyển**: Gửi đơn ứng tuyển chỉ với một click
- **Theo dõi đơn ứng tuyển**: Xem danh sách tất cả công việc đã ứng tuyển trong bảng chuyên dụng
- **Trạng thái đơn**: Theo dõi trạng thái đơn ứng tuyển (Pending, Reviewed, Accepted, Rejected, Interviewing)
- **Quản lý người ứng tuyển**: Nhà tuyển dụng có thể xem và quản lý người ứng tuyển cho tin đã đăng

### Quản lý công ty
- **Đăng ký công ty**: Nhà tuyển dụng có thể đăng ký và quản lý công ty của mình
- **Hồ sơ công ty**: Trang chi tiết công ty với logo, mô tả, địa chỉ, website và số lượng nhân viên
- **Danh sách công ty**: Duyệt tất cả các công ty đã đăng ký

### Admin Dashboard
- **Admin-only routes**: Quản lý việc làm, công ty và người ứng tuyển
- **Tổng quan công ty**: Xem, tạo và quản lý công ty
- **Tổng quan việc làm**: Admin xem tất cả tin tuyển dụng với số lượng người ứng tuyển
- **Theo dõi người ứng tuyển**: Xem ai đã ứng tuyển công việc nào và cập nhật trạng thái
- **Đăng tin tuyển dụng**: Giao diện admin để đăng tin tuyển dụng mới
- **Thiết lập công ty**: Quản lý thông tin công ty và thương hiệu

### UI/UX Highlights
- **Responsive design**: Giao diện tương thích trên mọi thiết bị với Tailwind CSS
- **Dark mode**: Hỗ trợ chuyển đổi giao diện tối/sáng trong toàn bộ ứng dụng
- **Toast notifications**: Thông báo phản hồi người dùng qua Sonner khi thực hiện hành động
- **Carousel**: Carousel danh mục và việc làm nổi bật sử dụng Embla
- **Interactive tables**: Bảng có sắp xếp, lọc và các nút hành động trong admin
- **Modern design**: Giao diện sạch, chuyên nghiệp với các component shadcn/ui

---

## Database Schema (MongoDB/Mongoose)

### User Model
| Field | Type | Description |
|---|---|---|
| `email` | String (unique, required) | Địa chỉ email người dùng |
| `fullName` | String (required) | Họ và tên người dùng |
| `password` | String (required) | Mật khẩu đã được băm (hash) |
| `phoneNumber` | String | Số điện thoại liên hệ |
| `role` | Enum: `job_seeker`, `recruiter` | Vai trò người dùng |
| `profile` | Object | Hồ sơ: bio, kỹ năng, resume, avatar, thông tin công ty,... |
| `createdAt` / `updatedAt` | Date | Thời gian tạo/cập nhật |

### Job Model
| Field | Type | Description |
|---|---|---|
| `title` | String (required) | Tiêu đề công việc |
| `description` | String (required) | Mô tả công việc |
| `requirements` | Array of String | Yêu cầu công việc |
| `salary` | Number | Mức lương |
| `location` | String | Địa điểm làm việc |
| `jobType` | Enum | `Full-time`, `Part-time`, `Internship`, `Contract` |
| `category` | Enum | Danh mục công việc (Engineering, Marketing,...) |
| `experienceLevel` | String | Số năm kinh nghiệm yêu cầu |
| `positions` | Number | Số lượng vị trí tuyển |
| `company` | ObjectId (ref: Company) | Công ty đang tuyển |
| `createdBy` | ObjectId (ref: User) | Nhà tuyển dụng tạo tin |
| `applications` | Array of ObjectId (ref: Application) | Các đơn ứng tuyển đã nhận |

### Company Model
| Field | Type | Description |
|---|---|---|
| `name` | String (unique, required) | Tên công ty |
| `description` | String | Mô tả công ty |
| `website` | String | Website công ty |
| `location` | String | Địa chỉ công ty |
| `logo` | String | URL logo công ty (Cloudinary) |
| `employeeCount` | Number | Số lượng nhân viên |
| `userId` | ObjectId (ref: User) | Nhà tuyển dụng đăng ký công ty |

### Application Model
| Field | Type | Description |
|---|---|---|
| `job` | ObjectId (ref: Job) | Công việc đã ứng tuyển |
| `applicant` | ObjectId (ref: User) | Người ứng tuyển |
| `status` | Enum | `Pending`, `Reviewed`, `Accepted`, `Rejected`, `Interviewing` |
| `appliedAt` | Date | Thời gian ứng tuyển |

---

## API Endpoints

### Authentication & Users (`/api/v1/user`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/register` | Đăng ký tài khoản mới | Không |
| POST | `/login` | Đăng nhập | Không |
| GET | `/logout` | Đăng xuất | Có |
| GET | `/profile` | Xem thông tin cá nhân | Có |
| PATCH | `/profile/update` | Cập nhật thông tin cá nhân | Có |

### Jobs (`/api/v1/job`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/post` | Tạo tin tuyển dụng mới | Có (Recruiter) |
| GET | `/get` | Lấy danh sách công việc (có bộ lọc) | Không |
| GET | `/get/:id` | Xem chi tiết công việc | Không |
| GET | `/getadminjobs` | Lấy danh sách công việc của nhà tuyển dụng | Có (Recruiter) |
| PATCH | `/update/:id` | Cập nhật tin tuyển dụng | Có (Recruiter) |

### Companies (`/api/v1/company`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/register` | Đăng ký công ty mới | Có (Recruiter) |
| GET | `/get` | Lấy danh sách công ty | Có |
| GET | `/get/:id` | Xem chi tiết công ty | Có |
| PATCH | `/update/:id` | Cập nhật thông tin công ty | Có (Recruiter) |

### Applications (`/api/v1/application`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/apply/:id` | Ứng tuyển vào công việc | Có |
| GET | `/get` | Lấy danh sách đơn ứng tuyển của người dùng | Có |
| GET | `/:id/applicants` | Xem người ứng tuyển cho công việc cụ thể | Có (Recruiter) |
| PATCH | `/status/:id/update` | Cập nhật trạng thái đơn ứng tuyển | Có (Recruiter) |

---

## Installation & Setup

### Yêu cầu
- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB** (local hoặc MongoDB Atlas)
- **Cloudinary** account (để upload hình ảnh/file)

### 1. Clone repository
```bash
git clone https://github.com/anhtuan11cwt/lifetimeCoding-job-website.git
cd lifetimeCoding-job-website
```

### 2. Cài đặt Backend
```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend/` (xem `backend/.env.example`):
```env
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/job-website
SECRET_KEY=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Chạy backend dev server:
```bash
npm run dev
```
API server sẽ chạy tại `http://localhost:8000`.

### 3. Cài đặt Frontend
```bash
cd ../frontend
npm install
```

Tạo file `.env` trong thư mục `frontend/` (hoặc sửa file `.env.production`):
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

Chạy frontend dev server:
```bash
npm run dev
```
Ứng dụng sẽ chạy tại `http://localhost:5173`.

### 4. Production Build (Tùy chọn)
```bash
# Build frontend
cd frontend && npm run build

# Backend sẽ phục vụ frontend đã build từ thư mục ../frontend/dist
# Set NODE_ENV=production trong backend .env
cd ../backend && npm start
```

---

## Available Scripts

### Backend
| Script | Command | Description |
|---|---|---|
| `dev` | `nodemon index.js` | Chạy dev server với auto-reload |
| `start` | `node index.js` | Chạy production server |
| `predev` | `npx kill-port 8000` | Giải phóng cổng 8000 trước khi chạy dev |
| `lint` | `eslint .` | Chạy ESLint |
| `check` | `biome check --write` | Chạy Biome formatter & linter |
| `format` | `biome format --write` | Format code với Biome |
| `build` | `npm run check2 && npm run lint` | Chạy kiểm tra và lint |

### Frontend
| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Chạy Vite development server |
| `build` | `vite build` | Build production vào thư mục `dist/` |
| `preview` | `vite preview` | Xem trước bản build production |
| `lint` | `eslint .` | Chạy ESLint |
| `check` | `biome check --write` | Chạy Biome formatter & linter |
| `format` | `biome format --write` | Format code với Biome |

---

## API Documentation

Tài liệu API chi tiết với Postman test examples có trong thư mục [`backend/docs/`](./backend/docs/):

- [`user-api-test-postman.md`](./backend/docs/user-api-test-postman.md) - API người dùng/xác thực
- [`job-api-test-postman.md`](./backend/docs/job-api-test-postman.md) - API quản lý việc làm
- [`company-api-test-postman.md`](./backend/docs/company-api-test-postman.md) - API quản lý công ty
- [`application-api-test-postman.md`](./backend/docs/application-api-test-postman.md) - API quản lý đơn ứng tuyển

---

## Vai trò người dùng

### Job Seeker
- Duyệt và tìm kiếm công việc
- Xem chi tiết mô tả công việc
- Ứng tuyển vào công việc
- Theo dõi trạng thái đơn ứng tuyển
- Quản lý hồ sơ cá nhân và tải CV
- Xem lịch sử công việc đã ứng tuyển

### Recruiter / Admin
- Đăng ký và quản lý hồ sơ công ty
- Đăng và quản lý tin tuyển dụng
- Xem người ứng tuyển cho tin đã đăng
- Cập nhật trạng thái đơn ứng tuyển (Pending > Reviewed > Interviewing > Accepted/Rejected)
- Dashboard quản trị với bảng quản lý đầy đủ

---

## State Management (Redux)

Ứng dụng sử dụng **Redux Toolkit** và **Redux Persist** để quản lý state với 4 slice:

| Slice | Key State | Actions |
|---|---|---|
| `authSlice` | Thông tin người dùng, token, trạng thái xác thực | `login`, `logout`, `updateProfile`, `setUser` |
| `jobSlice` | Tất cả công việc, admin jobs, công việc được chọn, tham số tìm kiếm | `setAllJobs`, `setAdminJobs`, `setSelectedJob`, `setSearchQuery` |
| `companySlice` | Tất cả công ty, công ty theo ID | `setAllCompanies`, `setCompanyById` |
| `applicationSlice` | Đơn ứng tuyển của người dùng, danh sách người ứng tuyển | `setAppliedJobs`, `setAllApplicants` |

---

## Bảo mật

- **JWT Authentication**: Token được lưu trong HTTP-only cookies để tránh tấn công XSS
- **Password Hashing**: Tất cả mật khẩu được băm (hash) bằng bcryptjs
- **Protected Routes**: Các endpoint backend được bảo vệ bởi authentication middleware
- **CORS**: Chỉ cho phép request từ frontend URL đã được cấu hình
- **File Uploads**: Hình ảnh và file được upload lên Cloudinary, không lưu trên server
- **Role-based Access**: Các endpoint dành cho recruiter được bảo vệ bởi kiểm tra vai trò

---

## Contributing

1. Fork repository
2. Tạo nhánh mới (`git checkout -b feature/improvement`)
3. Thực hiện thay đổi
4. Chạy linting và formatting: `npm run check`
5. Commit thay đổi (`git commit -am 'Add new feature'`)
6. Đẩy lên nhánh (`git push origin feature/improvement`)
7. Mở Pull Request

---

## License

This project is licensed under the ISC License.

---

## Liên hệ & Hỗ trợ

- **Tác giả**: Trần Anh Tuấn
- **Repository**: [https://github.com/anhtuan11cwt/lifetimeCoding-job-website](https://github.com/anhtuan11cwt/lifetimeCoding-job-website)
- **Issues**: Vui lòng báo cáo lỗi trên [GitHub Issues](https://github.com/anhtuan11cwt/lifetimeCoding-job-website/issues)
