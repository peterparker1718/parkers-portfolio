# Multi-stage build for production optimization

# Frontend build stage
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/ ./
RUN npm run build

# Backend build stage  
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Install serve to serve frontend build
RUN npm install -g serve

# Copy backend files
COPY --from=backend-builder /app/backend ./backend

# Copy frontend build
COPY --from=frontend-builder /app/frontend/build ./frontend/build

# Create startup script
RUN echo '#!/bin/sh\n\
serve -s frontend/build -l 3000 &\n\
cd backend && node src/server.js' > /app/start.sh && chmod +x /app/start.sh

# Expose ports
EXPOSE 3000 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Start the application
CMD ["/app/start.sh"]