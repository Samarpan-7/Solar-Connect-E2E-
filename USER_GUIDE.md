# Solar Connect - User Guide

## 🎉 Successfully Implemented Features

### ✅ Complete Authentication System
- **4 User Types**: Customer, Solar Provider, Electrician, Admin
- **Approval Workflow**: Providers and electricians need admin approval
- **Secure Login**: JWT-based authentication with password hashing

### ✅ Bilingual Survey System (English/Telugu)
- Appears only on customer's first login
- 17 comprehensive questions across 5 sections
- Real-time language toggle
- Score-based recommendations
- Beautiful, mobile-responsive UI

### ✅ Admin Dashboard
- Approve/reject provider and electrician registrations
- View all users and their status
- Survey completion statistics
- User management interface

---

## 🔑 Login Credentials

### Admin Access:
- **Email**: `admin@solarconnect.com`
- **Password**: `Admin@123456`
- **Dashboard**: http://localhost:5173/admin

### Test Customer (Already Created):
- **Email**: `ayamini1506@gmail.com`
- **Password**: (Your password)

---

## 🚀 How to Use

### 1. Start the Application
```bash
cd C:\Users\ayami\OneDrive\Documents\SolarPanelProject
npm run dev
```
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### 2. User Registration Flow

#### **Customer Registration:**
1. Go to http://localhost:5173/signup
2. Fill in details and select "Customer"
3. After signup → Redirected to login
4. First login → Survey form appears (English/Telugu toggle available)
5. Complete survey → Redirected to home

#### **Provider/Electrician Registration:**
1. Go to http://localhost:5173/signup
2. Fill in details and select "Solar Provider" or "Licensed Electrician"
3. After signup → "Pending admin approval" message
4. Cannot login until admin approves

### 3. Admin Workflow
1. Login with admin credentials
2. View "Pending Approvals" tab
3. Click "Approve" or "Reject" for providers/electricians
4. View all users in "All Users" tab
5. Check survey statistics

### 4. Survey Features
- **Language Toggle**: Switch between English/Telugu anytime
- **Section Navigation**: Previous/Next buttons
- **Progress Tracking**: Visual progress bar
- **Score Categories**:
  - 0-30: Low Awareness
  - 31-55: Moderate Awareness
  - 56-80: High Awareness
- **Only shown once** per customer on first login

---

## 📊 Database Structure

### Users Table:
- `user_type`: customer, provider, electrician, admin
- `approval_status`: pending, approved, rejected
- `survey_completed`: TRUE/FALSE (for customers)

### Survey Responses Table:
- Stores all survey submissions
- Tracks awareness levels and willingness

---

## 🎨 Features Highlights

### Beautiful UI/UX:
✅ Solar-themed color palette (orange/amber gradients)
✅ Smooth animations and transitions
✅ Fully responsive design
✅ Clean, modern interface
✅ Professional cards and layouts

### Security:
✅ Password hashing with bcrypt
✅ JWT token authentication
✅ Protected admin routes
✅ SQL injection prevention

### User Experience:
✅ Clear error messages
✅ Loading states
✅ Success notifications
✅ Intuitive navigation
✅ Mobile-friendly

---

## 🔧 Technical Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- React Router DOM v6
- Axios
- Lucide React Icons

**Backend:**
- Node.js + Express
- MySQL 9.5
- JWT authentication
- Bcrypt for passwords

**Database:**
- MySQL with proper indexing
- Foreign key relationships
- Optimized queries

---

## 📝 Survey Questions Overview

### Section 1: Awareness (4 questions)
- Knowledge of solar energy
- Subsidy awareness
- Benefits awareness

### Section 2: Perception & Value (3 questions)
- Importance of renewable energy
- Savings perception
- Environmental impact

### Section 3: Willingness to Adopt (3 questions)
- Installation willingness
- Timeline for adoption
- Provider comparison interest

### Section 4: Barriers (3 questions)
- Obstacles to adoption
- Installer confidence
- Support system needs

### Section 5: Comparative Understanding (4 questions)
- Savings awareness
- Switching likelihood
- Primary energy consideration
- Tracking interest

---

## 🎯 Testing Scenarios

### Test Customer Flow:
1. Signup as customer
2. Login → Survey appears
3. Complete survey (test language toggle)
4. View results and recommendation
5. Logout and login again → No survey, goes to home

### Test Provider Flow:
1. Signup as solar provider
2. See "pending approval" message
3. Try to login → "Pending admin approval" error
4. Login as admin
5. Approve the provider
6. Login as provider → Success

### Test Admin Flow:
1. Login with admin@solarconnect.com
2. View pending approvals
3. Approve/reject users
4. View statistics
5. Check all users table

---

## ⚠️ Important Notes

1. **Survey shows only once** per customer on first login
2. **Admin is pre-created** - only one admin account
3. **Providers and electricians** need approval before login
4. **React Router warnings** are fixed
5. **Database connection** is working perfectly
6. **All data is saved** in MySQL

---

## 🐛 Troubleshooting

### If backend doesn't connect:
- Check MySQL is running
- Verify password in `.env` file
- Run: `mysql -u root -p"Miniminnu#89723"`

### If frontend shows errors:
- Clear browser cache
- Check console for errors
- Verify backend is running on port 5000

### If survey doesn't appear:
- Check user's `survey_completed` field in database
- Should be FALSE for first-time customers

---

## 🎊 What's Working Perfectly

✅ Beautiful landing page with animations
✅ User registration with validation
✅ Login with proper redirects
✅ Survey form (bilingual) on first customer login
✅ Admin dashboard with approval system
✅ Database saving all information
✅ JWT authentication
✅ Responsive design
✅ Professional UI/UX
✅ No console errors
✅ React Router warnings fixed

---

## 📞 Support

All systems operational! Ready for testing and demonstration.

**Application URLs:**
- Main Site: http://localhost:5173
- Admin Panel: http://localhost:5173/admin
- API Server: http://localhost:5000

**Database:** solar_connect_db (MySQL)
