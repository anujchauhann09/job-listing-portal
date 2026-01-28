
# Job Seeker Profile & Resume APIs Documentation

## Base URL
```
/api/v1/job-seeker/profile
```

---

## Authentication & Authorization
- All endpoints require **JWT Authentication**
- Role required: **JOB_SEEKER**
- User identity is derived from JWT `sub` (user UUID)
- Frontend must **never send userId or profileId**

---

# Job Seeker Profile APIs

## 1. Get Own Job Seeker Profile

### Endpoint
```
GET /api/v1/job-seeker/profile/me
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "user": {
      "name": "Anuj Chauhan",
      "email": "anuj@gmail.com"
    },
    "profile": {
      "experienceYears": 2,
      "currentTitle": "Backend Developer",
      "currentLocation": "Bangalore",
      "expectedSalary": 800000,
      "noticePeriodDays": 30,
      "resumeUrl": "/uploads/resumes/uuid.pdf",
      "skills": ["Node.js", "PostgreSQL"]
    }
  }
}
```

---

## 2. Update Job Seeker Profile (PATCH)

### Endpoint
```
PATCH /api/v1/job-seeker/profile/me
```

### Request Body (Any subset)
```json
{
  "currentLocation": "Remote",
  "expectedSalary": 900000
}
```

### Rules
- Partial update only
- At least **one field must be provided**
- Skills array replaces existing skills if sent

### Success Response (200)
```json
{
  "success": true,
  "message": "Job seeker profile updated successfully",
  "data": { }
}
```

---

# Resume APIs

Resume upload is intentionally separated from profile APIs.

---

## 3. Upload Resume

### Endpoint
```
POST /api/v1/job-seeker/profile/resume
```

### Request Type
```
multipart/form-data
```
Field name: `resume`

### Allowed Files
- PDF, DOC, DOCX
- Max size: 5MB

### Success Response (200)
```json
{
  "success": true,
  "message": "Resume uploaded successfully",
  "data": {
    "resumeUrl": "/uploads/resumes/uuid.pdf"
  }
}
```

---

## 4. Get Resume URL

### Endpoint
```
GET /api/v1/job-seeker/profile/resume
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "resumeUrl": "/uploads/resumes/uuid.pdf"
  }
}
```

---

## 5. Download Resume

### Endpoint
```
GET /api/v1/job-seeker/profile/resume/download
```

### Behavior
- Downloads resume file
- Only owner can download
- Returns 404 if resume not found

---

## 6. Delete Resume

### Endpoint
```
DELETE /api/v1/job-seeker/profile/resume
```

### Behavior
- Deletes resume file from storage
- Sets resumeUrl to null

### Success Response (200)
```json
{
  "success": true,
  "message": "Resume deleted successfully"
}
```

---

## Error Responses

| Status | Meaning |
|------|--------|
| 400 | Validation Error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Profile / Resume Not Found |
| 409 | Profile Already Exists |
| 500 | Internal Server Error |

---

## Notes
- Resume upload uses **local storage** (S3-ready design)
- Profile APIs accept **JSON only**
- Resume APIs accept **file only**
- No breaking changes required when moving to S3

---

**Document Version:** v1.0  
**Module:** Job Seeker  
