# Job Module – Design & API Documentation

## Overview
The **Job module** is responsible for managing job listings created by employers and exposing public job data to job seekers.  
It handles **job creation, updates, deletion, skills mapping, and public job discovery**.

This separation ensures clean domain boundaries and scalability.

---

## Domain Responsibilities

### Job Module
- Employer creates and manages jobs
- Job lifecycle management
- Job ↔ Skill mapping
- Public job discovery (search, filter, pagination)

---

## Core Entities

### Job
Represents a job listing posted by an employer.

**Key fields:**
- `uuid` – Public identifier (API-safe)
- `employerId` – Internal reference
- `title`
- `description`
- `location`
- `jobType`
- `experienceLevel`
- `remoteType`
- `salaryMin`, `salaryMax`, `salaryCurrency`
- `status` – Job lifecycle
- `isActive`, `isDeleted`
- `createdAt`, `updatedAt`

---

### JobSkill
Junction entity mapping required skills to a job.

**Purpose:**
- Normalize skills
- Enable skill-based search & matching
- Reuse skill records across jobs

---

## Job Lifecycle

### Valid Statuses
- `DRAFT`
- `OPEN`
- `CLOSED`
- `ARCHIVED`

### Rules
- Only `OPEN` jobs are visible publicly
- Closed or archived jobs cannot receive applications
- Jobs are soft-deleted for auditability

---

## API Endpoints

### Employer APIs

#### Create Job
```
POST /employer/jobs
```

**Auth:** Employer  
**Description:** Create a new job listing

---

#### Update Job
```
PATCH /employer/jobs/{jobUuid}
```

**Rules**
- Partial updates only
- Employer must own the job

---

#### Delete Job (Soft Delete)
```
DELETE /employer/jobs/{jobUuid}
```

---

#### Get Employer Jobs
```
GET /employer/jobs
```

---

### Public APIs

#### Get Jobs (Public Listing)
```
GET /jobs
```

**Query Params**
- `page`
- `limit`
- `location`
- `jobType`
- `salaryMin`
- `salaryMax`
- `sortBy`
- `sortOrder`

---

#### Get Job by UUID
```
GET /jobs/{jobUuid}
```

---

## Security & Authorization

- UUIDs are exposed at API boundaries
- Internal numeric IDs are never returned
- Employers can only manage their own jobs
- Public endpoints are read-only
- Soft deletes prevent accidental data loss

---

## Architecture & Layering

```
Routes → Controller → Service → Repository → Database
```

### Layer Responsibilities
- **Routes**: HTTP method & path mapping
- **Controller**: Validation & request handling
- **Service**: Business rules & authorization
- **Repository**: Prisma-only database access
- **Database**: Persistent storage

---

## Design Decisions

### Why JobSkill is created with Job
- Skills are intrinsic job metadata
- They exist regardless of applications
- Enables efficient querying and matching

---

### Why JobApplication is not part of this module
- Applications are user-driven events
- Require different permissions & lifecycle
- Cleaner bounded context separation

---

## Performance Considerations

- Indexed fields:
  - `employerId`
  - `status`
  - `jobType`
  - `location`
- Pagination enforced on public listings
- Safe selects to avoid over-fetching

---

## Extensibility

The Job module can be extended with:
- Job analytics (views, applies)
- Job expiration automation
- Recommendation engines
- Search indexing (Elastic / OpenSearch)

---

**Document Version:** v1.0  
**Module:** Job
