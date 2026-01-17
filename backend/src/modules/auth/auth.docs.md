# Authentication Module – API Documentation

## Overview

The Authentication module provides secure user authentication and session management for the Job Listing Portal.

It implements:
- User registration
- User login
- JWT-based authentication
- Refresh token mechanism
- Logout (session invalidation)

This module follows **industry best practices**:
- Stateless access tokens (JWT)
- Stateful refresh tokens (DB-backed)
- Role-based user onboarding
- Centralized error handling
- Secure password hashing

---

## Base URL

- /api/v1/auth

---

## Authentication Strategy

| Component       | Strategy |
|----------------|----------|
| Auth Type      | Email + Password |
| Password Hash  | bcrypt |
| Access Token   | JWT (short-lived) |
| Refresh Token  | Random token (stored in DB) |
| Token Transport| Authorization Header (Bearer) |

---

## Roles & User Types

### User Types (Client-facing)

| userType   |
|------------|
| JOB_SEEKER |
| EMPLOYER   |

### Roles (Internal)

| Role Name   | roleId |
|-------------|--------|
| JOB_SEEKER  | 2      |
| EMPLOYER    | 3      |

`roleId` is **never accepted from the client**.  
The backend assigns roles based on `userType`.

---

## Standard API Response Format

All APIs return responses in the following format:

### Success
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

---

## Error Handling Rules

- Validation errors → 400 Bad Request
- Authentication failures → 401 Unauthorized
- Authorization failures → 403 Forbidden
- Conflict (duplicate email) → 409 Conflict
- Internal errors → 500 Internal Server Error

No stack traces or internal details are exposed to clients.

---

## Endpoints

### Register User

- Endpoint:
POST /api/v1/register

- Description:
Registers a new user as either a Job Seeker or Employer.

- Request Body:
```json
{
  "email": "user@example.com",
  "password": "Strong@123",
  "userType": "JOB_SEEKER"
}
```

- Validation Rules:

1) Email must be valid
2) Password must meet strength requirements
3) userType must be JOB_SEEKER or EMPLOYER

- Success Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "uuid": "c9a9c0c4-7e3e-4e7a-a1b9-9d9a7f8b1234",
    "createdAt": "2026-01-17T10:30:00.000Z"
  }
}
```

### Login User

- Endpoint:
POST /api/v1/login

- Description:
Authenticates a user and issues access & refresh tokens.

- Request Body:
```json
{
  "email": "user@example.com",
  "password": "Strong@123"
}
```

- Success Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "<JWT_ACCESS_TOKEN>",
    "refreshToken": "<REFRESH_TOKEN>",
    "user": {
      "uuid": "c9a9c0c4-7e3e-4e7a-a1b9-9d9a7f8b1234",
      "email": "user@example.com",
      "role": "JOB_SEEKER"
    }
  }
}
```

### Refresh Access Token

- Endpoint:
POST /api/v1/refresh

- Description:
Issues a new access token using a valid refresh token.

- Request Body:
```json
{
  "refreshToken": "<REFRESH_TOKEN>"
}
```

- Success Response:
```json
{
  "success": true,
  "message": "Token refreshed",
  "data": {
    "accessToken": "<NEW_JWT_ACCESS_TOKEN>"
  }
}
```

### Logout User 

- Endpoint:
POST /api/v1/logout

- Headers:
Authorization: Bearer <ACCESS_TOKEN>

- Request Body:
```json
{
  "refreshToken": "<REFRESH_TOKEN>"
}
```

- Description:
Invalidates the refresh token and logs the user out.

- Success Response:
```json
{
  "success": true,
  "message": "Logged out successfully",
  "data": null
}
```

## Protected Routes

- Any protected API must include:
```bash
Authorization: Bearer <ACCESS_TOKEN>
```

- If the token is missing, invalid, or expired:
```bash
401 Unauthorized
```

## Security Notes

- Passwords are never stored or logged in plain text
- JWT payload contains only:
    1) sub (user UUID)
    2) roleId
- Refresh tokens are:
    1) Random (non-JWT)
- Stored in database
- Revoked on logout
- Access tokens are short-lived and stateless

## Logging & Auditing

- All authentication actions are logged securely
- No sensitive data (passwords, tokens) are logged
- Logs are structured and human-readable



