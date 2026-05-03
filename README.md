# Enterprise Portal with RBAC

A secure enterprise access portal demonstrating Firebase Authentication integrated with Django-based Role-Based Access Control (RBAC), featuring dynamic dashboards for CEO, Manager, and Employee roles.

## Features

- Firebase Authentication
- Role-Based Access Control (RBAC)
- Separate dashboards for:
  - CEO
  - Manager
  - Employee
- Protected routes
- React frontend + Django backend

## Tech Stack

Frontend:
- ReactJS
- React Router

Backend:
- Django
- Django REST Framework

Authentication:
- Firebase Authentication

Database:
- Firebase / Firestore

---

## Project Structure

```text
project-root/
│
├── client/   # React app
├── server/   # Django server
```
---

## Setup Instructions

### 1. Clone Repository

```bash
git clone git@github.com:suhani-k7/enterprise-access-control.git
cd enterprise-access-control
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Runs on:
http://localhost:5173

---

## Backend Setup

```bash
cd server
pip install -r requirements.txt
python manage.py runserver
```

Runs on:
http://127.0.0.1:8000

---

## Firebase Setup

1. Create a Firebase project
2. Enable Email/Password Authentication
3. Add Firebase config in: client/src/firebase.js
4. Add Firebase Admin SDK credentials in backend.

---

## Demo Credentials

| Role | Email | Password |
|------|------|------|
| CEO | ceo@company.com | test123 |
| Manager | manager@company.com | test123 |
| Employee | employee@company.com | test123 |

---

## Role-Based Access

- CEO → Full dashboard access
- Manager → Team management access
- Employee → Personal dashboard access

---

## Screenshots

### Login Page
![Login Page](./screenshots/login1.png)

![Login Page](./screenshots/login2.png)

### CEO Dashboard
![CEO Dashboard](./screenshots/ceo-dash.png)

### Manager Dashboard
![Manager Dashboard](./screenshots/manager-dash.png)

### Employee Dashboard
![Employee Dashboard](./screenshots/employee-dash.png)

---

## Future Improvements

- Better UI/UX
- Real-time notifications
- Analytics dashboard
- Deployment
