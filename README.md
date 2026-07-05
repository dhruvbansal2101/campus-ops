# 🎓 CampusOps

A modern campus complaint management platform that enables students to report issues, track complaint progress in real time, and allows administrators to efficiently manage and resolve complaints through a centralized dashboard.

🌐 **Live Demo:** https://campus-ops-liart.vercel.app/login

---

## 📌 Overview

CampusOps digitizes the traditional complaint handling process in educational institutions by providing a transparent, role-based workflow.

Students can:
- Report campus issues
- Track complaint progress
- View complaint history
- Manage account settings
- Secure their accounts with Google or Email authentication

Administrators can:
- View all complaints
- Update complaint status
- Monitor complaint lifecycle
- Manage complaints through a simple dashboard

---

## ✨ Features

### 👨‍🎓 Student Portal

- Secure Authentication
  - Google Sign-In
  - Email & Password Login
  - Password Reset
  - Google Account Password Linking

- Complaint Management
  - Create new complaints
  - Categorize complaints
  - View personal complaint history
  - Individual complaint tracking

- Live Complaint Tracking
  Complaint statuses include:

  - 🟠 Reported
  - 🔵 Assigned
  - 🟡 In Progress
  - 🟢 Sorted

- User Profile
  - Complaint statistics
  - Total Reports
  - Pending Reports
  - Resolved Reports
  - Privacy & Security settings
  - Password management

---

### 🛠 Admin Portal

- View every complaint submitted
- Update complaint status
- Complaint details including:
  - Student Name
  - Category
  - Description
  - Current Status

- Role-based authentication
- Automatic Admin Dashboard redirection

---

## 🔐 Authentication

Implemented using **Firebase Authentication**

Supported providers:

- Google Authentication
- Email & Password Authentication
- Password Reset
- Password Linking for Google Users

---

## 🗄 Database

Built using **Cloud Firestore**

Collections:

```text
users/
    uid
        name
        email
        role
        createdAt

complaints/
    complaintId
        title
        description
        category
        userId
        userName
        status
        createdAt
        statusUpdatedAt
```

---

## 📈 Complaint Workflow

```text
Student submits complaint
            │
            ▼
        Reported
            │
            ▼
        Assigned
            │
            ▼
      In Progress
            │
            ▼
         Sorted
```

Every status update is reflected instantly in the student's tracking page.

---

## 🖥 Tech Stack

### Frontend

- Next.js 16
- React
- Tailwind CSS
- Lucide Icons

### Backend

- Firebase Authentication
- Cloud Firestore

### Deployment

- Vercel

---

## 📁 Project Structure

```text
app/
├── (main)/
│   ├── dashboard/
│   ├── report/
│   ├── tracking/
│   ├── profile/
│   ├── privacy/
│   ├── admin/
│   └── settings/
│
├── login/
│
components/
context/
lib/
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/dhruvbansal2101/campus-ops.git

cd campus-ops
```

### Install dependencies

```bash
npm install
```

### Create a `.env.local`

```env
NEXT_PUBLIC_FIREBASE_API_KEY=

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=

NEXT_PUBLIC_FIREBASE_PROJECT_ID=

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=

NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Run locally

```bash
npm run dev
```

Visit

```
http://localhost:3000
```

---

## 📷 Screens

- Login & Signup
- Dashboard
- Report Complaint
- Complaint Tracking
- Complaint Timeline
- User Profile
- Privacy & Security
- Admin Dashboard

---

## 🔒 Security

- Firebase Authentication
- Firestore Security Rules
- Protected Routes
- Role-Based Access Control
- Google & Email Authentication Support

---

## 📅 Upcoming Features

- Account Settings
- Notification Preferences
- Complaint Search
- Complaint Filters
- Admin Analytics Dashboard
- Complaint Assignment System
- Email Notifications
- Dark Mode
- Image Upload Support
- Push Notifications

---

## 👨‍💻 Developer

**Dhruv Bansal**

B.Tech Computer Science & Engineering  
Delhi Technological University (DTU)

GitHub: https://github.com/dhruvbansal2101

---

## 📄 License

This project is intended for educational and portfolio purposes.
