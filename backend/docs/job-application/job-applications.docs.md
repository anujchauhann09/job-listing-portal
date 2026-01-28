# Job Application Module – Design & API Documentation

## Overview
The **Job Application module** handles the complete lifecycle of a job application, from when a job seeker applies to a job until the application reaches a terminal state (Hired, Rejected, or Withdrawn).

---

## Domain Responsibilities

### Job Module 
- Job creation & management
- Job skills mapping
- Employer ownership & job visibility

### Job Application Module
- Job seeker applies to a job
- Prevent duplicate applications
- Track application status
- Employer reviews and updates application status
- Job seeker withdraws application

---

## Core Entities

### JobApplication
Represents a single application submitted by a job seeker for a job.

**Key fields:**
- `uuid` – Public identifier
- `jobId` – Internal reference to Job
- `jobSeekerId` – Internal reference to JobSeeker
- `status` – Application lifecycle status
- `resumeUrl` – Resume snapshot at apply time
- `coverLetter` – Optional
- `appliedAt` – Timestamp

---

## Application Status Lifecycle

The application lifecycle is enforced as a **state machine**.

### Valid Statuses
- `APPLIED`
- `SHORTLISTED`
- `REJECTED`
- `HIRED`
- `WITHDRAWN`

### Allowed Transitions

| Current Status | Allowed Next Status |
|---------------|---------------------|
| APPLIED | SHORTLISTED, REJECTED, WITHDRAWN |
| SHORTLISTED | HIRED, REJECTED |
| REJECTED | — (terminal) |
| HIRED | — (terminal) |
| WITHDRAWN | — (terminal) |

Invalid transitions are blocked at the **service layer**.

---

## API Endpoints

### Job Seeker APIs

#### Apply to Job
```
POST /jobs/{jobUuid}/apply
```

**Auth:** Job Seeker  
**Description:** Submit a new application for a job

**Request Body**
```json
{
  "resumeUrl": "https://cdn.example.com/resume.pdf",
  "coverLetter": "Optional text"
}
```

**Responses**
- `201 Created` – Application submitted
- `409 Conflict` – Already applied
- `404 Not Found` – Job not found or closed

---

#### Get My Applications
```
GET /job-seeker/applications
```

**Query Params**
- `page`
- `limit`
- `status` (optional)

---

#### Withdraw Application
```
PATCH /applications/{applicationUuid}/withdraw
```

**Rules**
- Only allowed when status is `APPLIED`

---

### Employer APIs

#### View Applications for a Job
```
GET /employer/jobs/{jobUuid}/applications
```

**Rules**
- Employer must own the job

---

#### Update Application Status
```
PATCH /applications/{applicationUuid}/status
```

**Request Body**
```json
{
  "status": "SHORTLISTED"
}
```

---

## Security & Authorization

- UUIDs are used at API boundaries
- Internal numeric IDs are never exposed
- Job seekers can only access their own applications
- Employers can only access applications for their own jobs
- Status transitions are validated centrally

---

## Architecture & Layering

```
Routes → Controller → Service → Repository → Database
```

### Layer Responsibilities
- **Routes**: HTTP mapping only
- **Controller**: Validation + request orchestration
- **Service**: Business rules & lifecycle enforcement
- **Repository**: Prisma-only data access
- **Database**: Persistence

---

## Design Decisions (Why This Approach)

- **No pre-created applications** – Applications are user-driven events
- **State machine enforcement** – Prevents invalid workflows
- **Separate module from Job** – Clean bounded context
- **Safe selects in repository** – No sensitive data leakage

---

## Extensibility

This module is designed to easily support:
- Notifications (email / websocket)
- Interview scheduling
- Application analytics
- Audit logs
- Resume versioning

---

**Document Version:** v1.0  
**Module:** Job Application

