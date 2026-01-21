# OAuth Authentication Module Documentation

## Overview

The OAuth Authentication module enables users to sign in or sign up using third-party identity providers:

- Google
- GitHub
- LinkedIn (OpenID Connect)

This module is part of the **Auth system** of the Job Listing Portal and supports:

- Secure OAuth 2.0 / OpenID Connect flows
- Role-based onboarding (Job Seeker / Employer)
- Account linking (same email across providers)
- JWT-based authentication

---

## Supported Providers

| Provider  | Protocol | Notes |
|---------|----------|------|
| Google  | OAuth 2.0 + OIDC | Uses `/userinfo` endpoint |
| GitHub | OAuth 2.0 | Requires separate email API |
| LinkedIn | OpenID Connect | Uses `/userinfo`, legacy APIs not supported |

---

## High-Level Flow

1. User selects role on frontend (Job Seeker / Employer)
2. Frontend redirects user to backend OAuth endpoint
3. Backend redirects user to provider with encoded `state`
4. Provider authenticates user
5. Provider redirects back to backend callback with `code` and `state`
6. Backend exchanges `code` for access token
7. Backend fetches user profile from provider
8. Backend creates or links user account
9. Backend issues JWT access token
10. User is redirected to frontend with token

---

## OAuth State Usage

The OAuth `state` parameter is used to:

- Preserve the selected user role across redirects
- Protect against CSRF attacks

The `state` is encoded as Base64 JSON:

```json
{
  "role": "JOB_SEEKER" | "EMPLOYER"
}
```

---

## API Endpoints

### Start OAuth Login

```
GET /api/v1/auth/oauth/:provider?role=JOB_SEEKER|EMPLOYER
```

**Parameters**

| Name | Location | Required | Description |
|----|--------|---------|-------------|
| provider | path | yes | google, github, linkedin |
| role | query | yes | JOB_SEEKER or EMPLOYER |

**Example**

```
GET /api/v1/auth/oauth/google?role=JOB_SEEKER
```

---

### OAuth Callback

```
GET /api/v1/auth/oauth/:provider/callback
```

**Query Parameters**

| Name | Required | Description |
|----|---------|-------------|
| code | yes | Authorization code from provider |
| state | yes | Base64-encoded role data |

This endpoint is called **only by the OAuth provider**, not manually.

---

## User Creation Logic

### Existing OAuth Account

- User is identified using `(provider, providerUserId)`
- Existing user is reused

### Account Linking

- If no OAuthAccount exists
- Backend checks for existing user by email
- OAuth account is linked to existing user

### New User Creation

If no user exists:

- `User` record is created
- `UserProfile` is created
- Role-specific entity is created:
  - `JobSeeker` if role = JOB_SEEKER
  - `Employer` if role = EMPLOYER

---

## Database Tables Involved

- `User`
- `UserProfile`
- `OAuthAccount`
- `JobSeeker` / `Employer`

The `OAuthAccount` table ensures:

- No duplicate OAuth identities
- One provider per user
- Safe re-login without duplication

---

## Security Considerations

- OAuth `state` parameter used for CSRF protection
- Authorization codes are single-use
- Access tokens are short-lived JWTs
- Password field is nullable for OAuth users

---

## Common Errors & Fixes

### 400 – OAuth authentication failed

- Missing `code` or `state`
- Callback URL opened manually

### 401 – Unauthorized

- Email not returned by provider
- Invalid or expired authorization code

### 403 – LinkedIn profile fetch failed

- Using legacy LinkedIn APIs
- Must use `/v2/userinfo` for OIDC

---

## Environment Variables

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
GOOGLE_AUTH_URL=
GOOGLE_TOKEN_URL=
GOOGLE_USERINFO_URL=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_REDIRECT_URI=
GITHUB_AUTH_URL=
GITHUB_TOKEN_URL=
GITHUB_USER_URL=
GITHUB_EMAIL_URL=

LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
LINKEDIN_REDIRECT_URI=
LINKEDIN_AUTH_URL=
LINKEDIN_TOKEN_URL=
LINKEDIN_USERINFO_URL=
```

---

## Notes

- OAuth callback URLs must exactly match provider dashboard configuration
- Authorization codes must never be reused
- Role is locked after first OAuth signup

---

## Summary

This OAuth module provides a secure, scalable, and industry-standard authentication system with:

- Multi-provider OAuth
- Role-based onboarding
- Clean separation of concerns
- Production-ready security practices

---

**Document Version:** 1.0  
**Last Updated:** 2026-01-20

