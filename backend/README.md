# Job Listing Portal – Backend (Node.js + Express)

This repository contains the **backend service** for the Job Listing Portal project, built using **Node.js and Express.js** following **industry best practices** for scalability, maintainability, and clean architecture.

The backend is responsible for:
- Handling HTTP APIs
- Managing application configuration
- Centralized logging
- Error handling
- Preparing a scalable structure for future modules (auth, jobs, applications, etc.)

---

## Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **Winston** – Centralized logging
- **Morgan** – HTTP request logging
- **dotenv** – Environment variable management
- **CORS** – Cross-origin support
- **Nodemon** – Development auto-reload

---

## Project Structure

```text
backend/
│
├── src/
│   ├── app.js                # Express app configuration
│   ├── server.js             # Server bootstrap
│   │
│   ├── config/
│   │   ├── env.js             # Environment variables loader
│   │   └── logger.js          # Winston logger configuration
│   │
│   ├── routes/
│   │   ├── index.js           # Routes aggregator
│   │   └── health.route.js    # Health check endpoint
│   │
│   ├── middlewares/
│   │   ├── request-logger.middleware.js  # HTTP request logging
│   │   └── error.middleware.js            # Central error handler
│   │
│   ├── utils/
│   │   └── response.util.js   # Standard API response helper
│   │
│   └── logs/
│       ├── combined.log       # All logs
│       └── error.log          # Error-only logs
│
├── .env                       # Environment variables
├── .gitignore
├── package.json
└── package-lock.json
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
cd backend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Environment variables

```bash
PORT=5000
NODE_ENV=development
```

---

### 4.Start the development server

```bash
npm run dev
```

### You should see the following output:

```bash
Backend server running on port 5000
```

---

## Logging Strategy

This project uses **Winston** for centralized and structured logging across the application.

### Log Files

- `src/logs/combined.log` → Stores **all application logs**
- `src/logs/error.log` → Stores **error-level logs only**

### Logging Features

- Console logs enabled in **development** environment
- File-based logs for **production** use
- Structured **JSON logs** for better observability
- HTTP request logging integrated via **Morgan**

---

## Error Handling

- All errors are handled through a **central error-handling middleware**
- Prevents leaking internal error details to API clients
- Errors are logged with **stack traces** in log files for debugging

---

## Security & Best Practices Followed

- Environment variables used for sensitive configuration
- Centralized logging across the application
- Clear separation of concerns:
  - Configuration
  - Routes
  - Middleware
- No direct business logic inside `server.js`
- Scalable and maintainable project structure

---

## Future Modules (Planned)

This backend structure is designed to easily support future enhancements such as:

- Authentication and authorization (JWT)
- Database integration (PostgreSQL)
- Job management module
- Job applications workflow
- Role-based access control (RBAC)

---

## Scripts

| Command        | Description                    |
|---------------|--------------------------------|
| `npm run dev` | Start server with nodemon      |
| `npm start`   | Start server in production mode|

---

##  Development Notes

- Do **not** expose internal numeric IDs to the frontend
- Use **UUIDs** for all public-facing identifiers
- Always add new features as **modules**, not directly inside `app.js`

