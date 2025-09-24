# Deployment Guide

## Overview

This portfolio can be deployed to various platforms. Here are the most common deployment options:

## Vercel (Recommended for Full-Stack)

### Prerequisites
- Vercel account
- GitHub repository

### Steps
1. Install Vercel CLI: `npm install -g vercel`
2. Run deployment script:
```bash
cd deployment/vercel
./deploy.sh
```

Or deploy manually:
```bash
vercel --prod
```

### Environment Variables
Add these in your Vercel dashboard:
- `NODE_ENV=production`
- `EMAIL_USER=your-email`
- `EMAIL_PASS=your-password`
- `CONTACT_EMAIL=your-contact-email`

## Netlify (Frontend Only)

### Prerequisites
- Netlify account
- GitHub repository

### Steps
1. Connect your GitHub repository to Netlify
2. Set build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`

### Configuration
The `netlify.toml` file handles routing and redirects automatically.

## Heroku (Backend API)

### Prerequisites
- Heroku account
- Heroku CLI

### Steps
1. Create Heroku app:
```bash
heroku create your-portfolio-api
```

2. Set environment variables:
```bash
heroku config:set NODE_ENV=production
heroku config:set EMAIL_USER=your-email
heroku config:set EMAIL_PASS=your-password
```

3. Deploy:
```bash
git subtree push --prefix backend heroku main
```

## Docker Deployment

### Prerequisites
- Docker installed
- Docker Compose (optional)

### Steps

1. Build and run with Docker Compose:
```bash
cd deployment/docker
docker-compose up --build
```

2. Or build manually:
```bash
docker build -f deployment/docker/Dockerfile -t parkers-portfolio .
docker run -p 3000:3000 -p 5000:5000 parkers-portfolio
```

### Production Considerations
- Use environment variables for sensitive data
- Configure proper logging
- Set up monitoring and health checks
- Use HTTPS in production
- Configure CORS properly

## AWS/DigitalOcean

For cloud providers:

1. Set up a server (EC2, Droplet, etc.)
2. Install Node.js and nginx
3. Clone repository and install dependencies
4. Build applications
5. Configure nginx as reverse proxy
6. Set up SSL with Let's Encrypt
7. Configure PM2 for process management

## Database Setup (Optional)

If using MongoDB:

1. Set up MongoDB Atlas or local instance
2. Add connection string to environment variables
3. Update backend models to use database

## Monitoring

Consider adding:
- Error tracking (Sentry)
- Analytics (Google Analytics)
- Performance monitoring (New Relic)
- Uptime monitoring (Pingdom)

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version compatibility
2. **API not working**: Verify environment variables
3. **Routing issues**: Ensure SPA routing is configured
4. **CORS errors**: Check origin settings in backend

### Logs

Check deployment logs:
- Vercel: `vercel logs`
- Netlify: Functions tab in dashboard
- Heroku: `heroku logs --tail`
- Docker: `docker logs container-name`