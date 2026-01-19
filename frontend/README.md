# Job Listing Portal – Frontend (Next.js App Router)

This repository contains the **frontend application** for the Job Listing Portal, built using **Next.js (App Router)** and **JavaScript**, following **industry best practices** for scalability, maintainability, and clean architecture.

The frontend is responsible for:
- Rendering user interfaces
- Handling routing using the App Router
- Communicating with backend APIs
- Managing layouts, components, and styles
- Preparing a scalable structure for authentication and dashboards

---

## Tech Stack

- **Next.js (App Router)** – React framework
- **React** – UI library
- **JavaScript** – Language (no TypeScript)
- **PostCSS / CSS** – Styling
- **ESLint** – Code linting

---

## Project Structure

```text
frontend/
│
├── src/
│   ├── app/                        # App Router (Next.js)
│   │   ├── layout.js               # Root layout (required)
│   │   ├── page.js                 # Home page (/)
│   │   ├── globals.css             # Global styles
│   │   ├── favicon.ico
│   │   │
│   │   ├── auth/                   # Authentication routes
│   │   │   └── login/
│   │   │       └── page.js          # /auth/login
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── common/                 # Shared components
│   │   └── ui/                     # Pure UI components
│   │
│   ├── layouts/                    # Reusable layout components
│   │
│   ├── services/                   # API communication layer
│   │   └── api.js                  # Centralized API handler
│   │
│   ├── utils/                      # Utility/helper functions
│   │
│   └── constants/                  # App-wide constants
│
├── public/                         # Static assets (images, icons)
│
├── .env                            # Environment variables
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json                   # Path aliases
├── next.config.mjs
├── postcss.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v18+ recommended)
- **npm**

### Verify installation

```bash
node -v
npm -v
```

---


### 1. Install dependencies

```bash
npm install
```

---

### 2. Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

### 3. Start the development server

```bash
npm run dev
```

### Expected Output

```bash
Local: http://localhost:3000
```

---

## Backend Integration

All backend API calls must use the following environment variable:

```bash
process.env.NEXT_PUBLIC_API_URL
```

This ensures:
- No hard-coded URLs
- Easy environment switching (dev / staging / production)
- Secure and configurable API access

---

## Best Practices Followed

- App Router used exclusively (no pages/ directory)
- Global styles defined only in src/app/globals.css
- API logic centralized inside services/
- UI components kept stateless where possible
- Clear separation of concerns across the codebase

--- 

## Future Enhancements (Planned)

- Authentication and protected routes
- Global state management
- Job search and filtering
- Employer and Job Seeker dashboards
- SEO and performance optimizations

---

## Error Handling

- All errors are handled through a **central error-handling middleware**
- Prevents leaking internal error details to API clients
- Errors are logged with **stack traces** in log files for debugging

---

## Scripts

| Command           | Description                         |
|-------------------|-------------------------------------|
| `npm run dev`     | Start Next.js development server    |
| `npm run build`   | Build the app for production        |
| `npm start`       | Start production server             |

---

##  Development Notes

- Keep route files (page.js) focused on rendering
- Move business logic to services/ or utils/
- Avoid hard-coding API URLs
- Prefer reusable components over page-specific logic
