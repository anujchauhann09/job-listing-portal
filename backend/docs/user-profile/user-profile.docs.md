
# User Profile & Avatar APIs Documentation

## Base URL
```
/api/v1/user/profile
```

---

## Authentication
- JWT Authentication required
- User identity derived from JWT `sub` (user UUID)
- Frontend must never send userId or profileId

---

# User Profile APIs (JSON Only)

## 1. Get My Profile

### Endpoint
```
GET /api/v1/user/profile/me
```

### Success Response (200)
```json
{
  "success": true,
  "message": "User profile fetched successfully",
  "data": {
    "uuid": "profile-uuid",
    "name": "Anuj Chauhan",
    "bio": "Backend developer",
    "phone": "+91XXXXXXXXXX",
    "avatarUrl": "/uploads/avatars/avatar-uuid.png"
  }
}
```

---

## 2. Update My Profile

### Endpoint
```
PATCH /api/v1/user/profile/me
```

### Request Body (Any subset)
```json
{
  "name": "Anuj Chauhan",
  "bio": "Backend Engineer | Node.js",
  "phone": "+91XXXXXXXXXX"
}
```

### Rules
- Partial update only
- At least one field is required
- To clear a field, send `null`

### Success Response (200)
```json
{
  "success": true,
  "message": "User profile updated successfully",
  "data": {}
}
```

---

# User Avatar APIs (File Only)

Avatar upload is intentionally separated from profile APIs.

---

## 3. Upload Avatar

### Endpoint
```
POST /api/v1/user/profile/avatar
```

### Request Type
```
multipart/form-data
```
Field name: `avatar`

### Allowed Files
- PNG, JPG, JPEG, WEBP
- Max size: 1MB

### Success Response (200)
```json
{
  "success": true,
  "message": "Avatar uploaded successfully",
  "data": {
    "avatarUrl": "/uploads/avatars/avatar-uuid.png"
  }
}
```

---

## 4. Get Avatar URL

### Endpoint
```
GET /api/v1/user/profile/avatar
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "avatarUrl": "/uploads/avatars/avatar-uuid.png"
  }
}
```

---

## 5. Download Avatar

### Endpoint
```
GET /api/v1/user/profile/avatar/download
```

### Behavior
- Downloads avatar image file
- Only owner can download
- Returns 404 if avatar not found

---

## 6. Delete Avatar

### Endpoint
```
DELETE /api/v1/user/profile/avatar
```

### Behavior
- Deletes avatar file from storage
- Sets `avatarUrl` to null

### Success Response (200)
```json
{
  "success": true,
  "message": "Avatar deleted successfully"
}
```

---

## Error Responses

| Status | Meaning |
|------|--------|
| 400 | Validation Error |
| 401 | Unauthorized |
| 404 | Profile / Avatar Not Found |
| 500 | Internal Server Error |

---

## Notes
- Profile APIs accept **JSON only**
- Avatar APIs accept **file only**
- Avatar upload uses local storage (S3-ready)
- No breaking changes required when migrating to S3
- API versioning (`/api/v1`) ensures backward compatibility

---

**Document Version:** v1.0  
**Module:** User Profile  
