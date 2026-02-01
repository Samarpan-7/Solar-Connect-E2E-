# Solar Connect Platform

A comprehensive web application for renewable energy adoption that connects users with trusted solar panel providers.

## 🌟 Features

- **Beautiful Landing Page** with modern UI/UX
- **User Authentication** - Secure signup and login
- **Multiple User Types** - Customers, Providers, Electricians
- **MySQL Database** integration
- **JWT Authentication**
- **Responsive Design** - Works on all devices

## 🚀 Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Lucide React for icons

### Backend
- Node.js with Express
- MySQL database
- JWT authentication
- Bcrypt for password hashing

## 📦 Installation & Setup

### 1. Install Dependencies

```bash
# Install root dependencies
npm run install:all
```

### 2. Database Setup

1. Open MySQL and run the SQL script:
```bash
mysql -u root -p < backend/config/dbSetup.sql
```

Or manually create the database using MySQL Workbench by executing the SQL in `backend/config/dbSetup.sql`

### 3. Configure Environment

The `.env` file is already configured with:
- MySQL password: `Miniminnu#89723`
- JWT secret key
- Server port: 5000
- Frontend URL: http://localhost:5173

### 4. Run the Application

```bash
# Run both frontend and backend concurrently
npm run dev
```

Or run separately:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
SolarPanelProject/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   └── LoginPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── dbSetup.sql
│   ├── controllers/
│   │   └── authController.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── README.md
```

## 🎨 Features Implemented

✅ Professional landing page with animations
✅ User registration with validation
✅ Secure login system
✅ JWT token authentication
✅ MySQL database integration
✅ Responsive design
✅ Error handling
✅ Form validation

## 🔐 Security

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Input validation
- SQL injection prevention with parameterized queries

## 📝 License

MIT License
