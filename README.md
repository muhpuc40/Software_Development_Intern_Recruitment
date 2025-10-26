# 🎓 Premier University Student Portal

> **Software Development Intern Recruitment — Practical Test (Software and Web Developer)**  
> **Developed by:** Minhaj Uddin Hassan  
> **ID:** 2104010202211  
> **Email:** [mdhassan49.muh@gmail.com](mailto:mdhassan49.muh@gmail.com)

---

## 📘 Project Overview

The Premier University Student Portal is a web application created for the Software Development Intern Recruitment practical test. It provides students a secure platform to log in, view their academic profiles, and manage sessions using JWT-based authentication. The app features a responsive UI and integrates with Premier University's APIs (with a mock fallback for offline testing).

---

## 🚀 Features

### 🔑 Authentication
- Login with username, password, and program selection; JWT stored in localStorage.
- Logout clears token and redirects to the login page.
- Protected routes: dashboard accessible only to authenticated users.

### 🧩 Dashboard
- Displays student profile details (Name, Program, Session, Roll, Email, Phone, etc.).
- Responsive UI built with Tailwind CSS.
- Personalized welcome section and logout action.

### 🌐 API Integration

| API Name               | Method | Endpoint                         | Description                             |
|------------------------|--------|----------------------------------|-----------------------------------------|
| Get All Programs       | GET    | /api/Basic/get_all_programs      | Fetches list of academic programs       |
| Student Login          | POST   | /api/Auth/student_login          | Authenticates student and returns JWT   |
| Get Authenticated User | GET    | /api/Auth/get_auth               | Retrieves student profile using JWT     |

- Mock fallback available to handle API unavailability during development.

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Navbar.jsx
│   └── Footer.jsx
├── services/
│   ├── api.js
│   └── mockApi.js
├── utils/
│   └── auth.js
├── App.jsx
└── main.jsx
```

---

## ⚙️ Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/muhpuc40/premier-university-portal.git
cd premier-university-portal
```

2. Install dependencies:
```bash
npm install
```

3. Run the project (development):
```bash
npm run dev
```

4. Open the app in your browser:
http://localhost:5173

---

## 🔧 Technical Details

- Frontend: React 18, Tailwind CSS  
- State Management: React Hooks (useState, useEffect)  
- API Handling: Fetch API with error handling and mock fallback  
- Authentication: JWT stored in localStorage  
- Build Tool: Vite  
- Version Control: Git & GitHub

---

## 🧠 How It Works

1. Login:
   - User selects a program, enters credentials, and submits.
   - App sends POST to /api/Auth/student_login.
   - On success, the JWT is stored in localStorage and the user is redirected to the dashboard.

2. Dashboard:
   - JWT is read from localStorage.
   - App calls /api/Auth/get_auth to fetch the student profile.
   - Profile data is displayed in a responsive layout.

3. Logout:
   - JWT is removed from localStorage and user is redirected to the login page.

---

## 🧩 Key Components

- Login.jsx: Program dropdown populated from /api/Basic/get_all_programs, form validation, error messages.
- Dashboard.jsx: Fetches and displays profile, includes logout.
- api.js: API request helpers with error handling and mock fallback.
- auth.js: JWT helper utilities:
```javascript
export const setToken = token => localStorage.setItem("jwt_token", token);
export const getToken = () => localStorage.getItem("jwt_token");
export const removeToken = () => localStorage.removeItem("jwt_token");
export const isAuthenticated = () => Boolean(getToken());
```

---

## 🎨 UI Design

- Login: gradient background, centered card, program dropdown, inputs, and feedback (errors/spinner).
- Dashboard: clean white card design, header with avatar initials, two-column details layout, responsive with Tailwind.

---

## 🛠️ Technologies Used

- React 18, Tailwind CSS, Fetch API, Vite, Git

---

## 💡 Notes & Suggestions
- Consider moving sensitive tokens to httpOnly cookies if backend supports it.
- Add unit/integration tests for authentication flows.
- Add environment-based API base URL configuration (e.g., .env).

---

*Built with 💻 and ☕ for Premier University*
