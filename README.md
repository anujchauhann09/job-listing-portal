# Job Listing Portal

The **Job Listing Portal** is a full-stack web application designed to connect **job seekers** with **employers** through a clean, scalable, and industry-standard architecture.  
The project is built using **Next.js (frontend)** and **Node.js + Express (backend)**, following modern best practices for maintainability, security, and scalability.

This repository serves as the **root project** that brings together both the frontend and backend applications.

---

## Project Overview

The Job Listing Portal enables:

- Job seekers to browse and apply for jobs
- Employers to post and manage job listings
- Secure and scalable backend APIs
- A modern, responsive frontend using Next.js
- Clean separation between frontend and backend

---

## Project Architecture

```text
job-listing-portal/
│
├── frontend/                 # Next.js frontend application
│   ├── README.md             # Frontend-specific documentation
│
├── backend/                  # Node.js + Express backend service
│   ├── README.md             # Backend-specific documentation
│
└── README.md                 # Overall project documentation 
```

## Tech Stack
Frontend:
- Next.js (App Router)
- React 
- JavaScript
- CSS / PostCSS
- ESLint

Backend:
- Node.js
- Express.js
- Winston (logging)
- Morgan (HTTP request logging)
- dotenv
- CORS

---

## Repository Structure

```text
job-listing-portal/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v18+ recommended)
- **npm**

### Verify installation

```bash
node -v
npm -v
```

---

### 1. Clone Repository

```bash
git clone <repository-url>
cd job-listing-portal
```

---

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```

The backend will start at:
http://localhost:5000

Refer to backend/README.md for detailed backend setup instructions.

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at:
http://localhost:3000

Refer to frontend/README.md for detailed frontend setup instructions.

---

## Frontend ↔ Backend Integration

- The frontend communicates with the backend via REST APIs
- Backend API base URL is configured using environment variables
- No hard-coded URLs are used in the frontend

---

## Best Practices Followed

- Clear separation of frontend and backend
- Environment-based configuration
- Centralized logging and error handling
- Scalable folder structure
- Industry-standard coding conventions
- No exposure of internal database IDs to the frontend

--- 

## Planned Features

- User authentication (Job Seeker / Employer)
- Role-based access control (RBAC)
- Job posting and job application workflows
- Job search and filtering
- Employer and Job Seeker dashboards
- Notifications and status tracking

---

## Development Guidelines

- Keep frontend UI logic separate from API logic
- Backend APIs should remain stateless
- Use UUIDs for public-facing identifiers
- Follow modular architecture for new features

---

## Documentation

- Frontend documentation: frontend/README.md
- Backend documentation: backend/README.md

Each module contains its own detailed setup and development instructions.

