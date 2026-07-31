# 💼 Job Portal MERN Stack

A full-stack Job Portal web application built using the **MERN Stack**. This platform allows job seekers to search and apply for jobs while recruiters can create companies, post jobs, and manage applications.

---

## 🚀 Live Demo

### 🌐 Frontend
https://job-portal-mern-tan.vercel.app/

### ⚙️ Backend API
https://job-portal-mern-backend-v0et.onrender.com/

---

# 📌 Features

## 👨‍💼 Job Seeker

- User Registration & Login
- Secure JWT Authentication
- Update Profile
- Upload Profile Photo
- Browse All Jobs
- Search Jobs
- Filter Jobs
- Apply for Jobs
- View Applied Jobs
- Logout

---

## 🏢 Recruiter

- Recruiter Login
- Create Company
- Update Company Details
- Upload Company Logo
- Post New Jobs
- Update Job Details
- View Posted Jobs
- View Applicants
- Accept Applications
- Reject Applications

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Redux Toolkit
- Redux Persist
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React
- Sonner Toast

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Multer
- Cloudinary
- Cookie Parser
- CORS
- dotenv

---

# 📂 Project Structure

```
job-portal-mern/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   ├── package.json
│
└── README.md
```

---

# 🔐 Authentication

- JWT Authentication
- HTTP Only Cookies
- Protected Routes
- Password Hashing using bcryptjs
- Authentication Middleware

---

# ☁️ Cloud Services

- MongoDB Atlas
- Cloudinary
- Render (Backend Deployment)
- Vercel (Frontend Deployment)

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/sandip-kumar-jha/job-portal-mern.git
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file

```env
PORT=8000

MONGO_URI=YOUR_MONGODB_URI

SECRET_KEY=YOUR_SECRET_KEY

CLOUD_NAME=YOUR_CLOUDINARY_NAME

API_KEY=YOUR_CLOUDINARY_API_KEY

API_SECRET=YOUR_CLOUDINARY_API_SECRET

FRONTEND_URL=http://localhost:5173
```

Run Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Run Frontend

```bash
npm run dev
```

---

# 📡 API Routes

## User

```
POST    /api/v1/user/register
POST    /api/v1/user/login
GET     /api/v1/user/logout
POST    /api/v1/user/profile/update
```

---

## Company

```
POST    /api/v1/company/register
GET     /api/v1/company/get
PUT     /api/v1/company/update/:id
GET     /api/v1/company/get/:id
```

---

## Job

```
POST    /api/v1/job/post
GET     /api/v1/job/get
GET     /api/v1/job/getadminjobs
GET     /api/v1/job/get/:id
```

---

## Application

```
GET     /api/v1/application/apply/:id
GET     /api/v1/application/get
GET     /api/v1/application/:id/applicants
POST    /api/v1/application/status/:id/update
```

---

# 🎯 Major Functionalities

- User Authentication
- Recruiter Dashboard
- Company Management
- Job Posting
- Job Searching
- Job Filtering
- Job Application
- Applicant Management
- Profile Management
- Image Upload
- Secure Cookies
- Responsive Design

---

# 🔒 Security

- JWT Authentication
- Password Hashing
- Protected APIs
- CORS Protection
- Secure Cookies
- Environment Variables
- Input Validation

---
- Home Page
- Login Page
- Signup Page
- Browse Jobs
- Job Details
- Recruiter Dashboard
- Company Dashboard
- Applicants Page


---

# 🚀 Deployment

## Frontend

Vercel

## Backend

Render

## Database

MongoDB Atlas

---

# 👨‍💻 Author

**Sandip Kumar Jha**

GitHub:
https://github.com/sandip-kumar-jha


---

# ⭐ Support

If you like this project, please give it a ⭐ on GitHub.

---

## 📄 License

This project is developed for learning and portfolio purposes.
