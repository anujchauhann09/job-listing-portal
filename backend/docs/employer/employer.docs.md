
# Employer Profile & Logo APIs Documentation

## Base URL
```
/api/v1/employer/profile
```

---

## Authentication & Authorization
- JWT Authentication required for all private endpoints
- Role required: **EMPLOYER**
- User identity is derived from JWT `sub` (user UUID)
- Frontend must never send internal database IDs

---

# Employer Profile APIs

## 1. Get Own Employer Profile

### Endpoint
```
GET /api/v1/employer/profile/me
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "companyDescription": "We build scalable backend systems.",
    "companySize": 50,
    "industry": "Information Technology",
    "website": "https://example.com",
    "headquartersCity": "Bangalore",
    "headquartersCountry": "India",
    "companyLogoUrl": null
  }
}
```

---

## 2. Update Employer Profile (PATCH)

### Endpoint
```
PATCH /api/v1/employer/profile/me
```

### Request Body (Any subset)
```json
{
  "companySize": 100,
  "headquartersCity": "Hyderabad"
}
```

### Rules
- Partial update only
- At least one field must be provided

### Success Response (200)
```json
{
  "success": true,
  "message": "Employer profile updated successfully",
  "data": {}
}
```

---

## 3. Public Employer Profile

### Endpoint
```
GET /api/v1/employer/profile/:companySlug
```

### Description
- Publicly accessible
- Returns limited company information
- Used for job listings and company pages

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "companyDescription": "We build scalable backend systems.",
    "industry": "Information Technology",
    "website": "https://example.com",
    "companySize": 50,
    "headquartersCity": "Bangalore",
    "headquartersCountry": "India",
    "companyLogoUrl": null
  }
}
```

---

# Employer Logo APIs

Company logo upload is intentionally separated from profile APIs.

---

## 4. Upload Company Logo

### Endpoint
```
POST /api/v1/employer/profile/logo
```

### Request Type
```
multipart/form-data
```
Field name: `logo`

### Allowed Files
- PNG, JPG, JPEG, WEBP
- Max size: 2MB

### Success Response (200)
```json
{
  "success": true,
  "message": "Company logo uploaded successfully",
  "data": {
    "companyLogoUrl": "/uploads/logos/logo-uuid.png"
  }
}
```

---

## 5. Get Logo URL

### Endpoint
```
GET /api/v1/employer/profile/logo
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "companyLogoUrl": "/uploads/logos/logo-uuid.png"
  }
}
```

---

## 6. Download Company Logo

### Endpoint
```
GET /api/v1/employer/profile/logo/download
```

### Behavior
- Downloads the company logo file
- Only owner can download
- Returns 404 if logo not found

---

## 7. Delete Company Logo

### Endpoint
```
DELETE /api/v1/employer/profile/logo
```

### Behavior
- Deletes logo file from storage
- Sets `companyLogoUrl` to null

---

## Error Responses

| Status | Meaning |
|------|--------|
| 400 | Validation Error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Profile / Logo Not Found |
| 409 | Profile Already Exists |
| 500 | Internal Server Error |

---

## Notes
- Profile APIs accept **JSON only**
- Logo APIs accept **file only**
- Logo upload uses local storage (S3-ready design)
- No breaking changes required when migrating to S3
- API versioning (`/api/v1`) ensures backward compatibility

---

**Document Version:** v1.0  
**Module:** Employer   
