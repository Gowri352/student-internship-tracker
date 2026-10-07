# Student Internship Tracker

Student Internship Tracker – Track Your Internship Journey

Student Internship Tracker is a MERN Stack web application designed to help students manage and track their internship details. Students can create an account, login, add internship information, view their internships, and check the approval status.

Faculty members can login separately, view all student internship submissions, approve internships, or reject them with a rejection reason.

The application uses MongoDB to store student, faculty, and internship details.

## 📱 Features

### 👨‍🎓 Student Features

🔐 Student Registration  
🔑 Student Login  
🚪 Student Logout  
👤 Student Profile  
➕ Add Internship  
🏢 Store Company Name  
💼 Store Internship Role  
📅 Select Start Date  
📅 Select End Date  
📋 View My Internships  
🗑️ Delete Internship  
📊 View Internship Status  
❌ View Rejection Reason  

### 👩‍🏫 Faculty Features

🔐 Faculty Registration  
🔑 Faculty Login  
🚪 Faculty Logout  
📋 View All Student Internships  
✅ Approve Internship  
❌ Reject Internship  
📝 Add Rejection Reason  
📊 Update Internship Status  

## 🛠️ Technologies Used

### Frontend

- React.js
- JavaScript
- CSS
- Axios
- Vite

### Backend

- Node.js
- Express.js
- Mongoose

### Database

- MongoDB
- MongoDB Compass

### Tools

- Visual Studio Code
- Postman
- Git
- GitHub

## 🗄️ Database

MongoDB is used to store student, faculty, and internship information.

Database Name:

```text
studentdb

Collections:

students
faculties
internships

                 ┌───────────────────┐
                 │      Login        │
                 └─────────┬─────────┘
                           │
                 ┌─────────┴─────────┐
                 │                   │
                 ▼                   ▼
        ┌────────────────┐   ┌────────────────┐
        │ Student Login  │   │ Faculty Login  │
        └───────┬────────┘   └───────┬────────┘
                │                    │
                ▼                    ▼
       ┌────────────────┐    ┌─────────────────┐
       │ Student        │    │ Faculty         │
       │ Dashboard      │    │ Dashboard       │
       └───────┬────────┘    └────────┬────────┘
               │                      │
        ┌──────┴──────┐               │
        │             │               │
        ▼             ▼               ▼
   Add Internship  View Internship  View All
        │             │           Internships
        ▼             │               │
    MongoDB           │        ┌──────┴───────┐
        │             │        │              │
        ▼             ▼        ▼              ▼
   Internship      Status   Approve        Reject
   Submitted               │              │
                           ▼              ▼
                       Approved        Reject

                                          ▼
                                  Rejection Reason

Student WorkFlow

Student
   ↓
Create Account / Login
   ↓
Student Dashboard
   ↓
Add Internship
   ↓
Internship Stored in MongoDB
   ↓
Faculty Reviews Internship
   ↓
Approved / Rejected
   ↓
Student Views Updated Status





Faculty WorkFlow

Faculty
   ↓
Create Account / Login
   ↓
Faculty Dashboard
   ↓
View Student Internships
   ↓
Review Internship
   ↓
Approve / Reject
   ↓
Update Internship Status
   ↓
Student Can View Status







