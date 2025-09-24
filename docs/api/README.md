# API Documentation

## Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

## Authentication
Currently, the API does not require authentication for public endpoints.

## Endpoints

### Health Check

#### GET `/health`
Check API health status

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "environment": "development",
  "version": "1.0.0",
  "memory": {
    "used": "45 MB",
    "total": "128 MB"
  }
}
```

### Projects

#### GET `/projects`
Get all projects

**Query Parameters:**
- `featured` (optional): `true` to get only featured projects

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "E-Commerce Platform",
      "description": "A full-stack e-commerce solution",
      "longDescription": "Detailed project description...",
      "technologies": ["React", "Node.js", "MongoDB"],
      "github": "https://github.com/example/repo",
      "live": "https://example.com",
      "image": "/api/assets/images/project.jpg",
      "featured": true,
      "createdAt": "2024-01-15"
    }
  ],
  "count": 1
}
```

#### GET `/projects/:id`
Get a specific project by ID

**Parameters:**
- `id`: Project ID (integer)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "E-Commerce Platform",
    "description": "A full-stack e-commerce solution",
    "longDescription": "Detailed project description...",
    "technologies": ["React", "Node.js", "MongoDB"],
    "github": "https://github.com/example/repo",
    "live": "https://example.com",
    "image": "/api/assets/images/project.jpg",
    "featured": true,
    "createdAt": "2024-01-15"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Project not found"
}
```

### Contact

#### POST `/contact`
Send contact form message

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in working with you..."
}
```

**Validation Rules:**
- `name`: Required, non-empty string
- `email`: Required, valid email format
- `subject`: Required, non-empty string
- `message`: Required, non-empty string

**Success Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Validation Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

## Error Responses

### Standard Error Format
```json
{
  "success": false,
  "message": "Error description"
}
```

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `429` - Too Many Requests (rate limiting)
- `500` - Internal Server Error

## Rate Limiting
- 100 requests per 15 minutes per IP address
- Rate limit headers included in response

## CORS
- Configured for frontend domain
- Credentials supported for authenticated requests

## Data Models

### Project Model
```typescript
interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  github: string;
  live: string;
  image: string;
  featured: boolean;
  createdAt: string;
}
```

### Contact Model
```typescript
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
```