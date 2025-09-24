# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/peterparker1718/parkers-portfolio.git
cd parkers-portfolio
```

2. Install dependencies:
```bash
npm run install:all
```

3. Set up environment variables:
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

4. Start development servers:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Development Workflow

### Project Structure
```
parkers-portfolio/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── styles/
│   └── public/
├── backend/           # Node.js API
│   ├── src/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── config/
│   │   └── utils/
│   └── tests/
├── deployment/        # Deployment configurations
├── docs/             # Documentation
└── assets/           # Static assets
```

### Available Scripts

#### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both applications for production
- `npm run test` - Run all tests
- `npm run lint` - Lint all code

#### Frontend
- `npm run start` - Start React development server
- `npm run build` - Create production build
- `npm run test` - Run React tests

#### Backend  
- `npm run dev` - Start with nodemon (auto-restart)
- `npm run start` - Start production server
- `npm run test` - Run API tests

### Code Style

- Use ES6+ features
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful commit messages

### Testing

- Frontend: Jest + React Testing Library
- Backend: Jest + Supertest
- Run tests before committing code

### Environment Variables

Create `.env` file in the backend directory:

```bash
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=parker@example.com
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable  
5. Run linting and tests
6. Submit a pull request