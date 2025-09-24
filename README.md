# Parker's Portfolio

A comprehensive, professional portfolio repository with organized structure for full-stack development, deployment, and documentation.

## 🚀 Features

- **Modern Frontend**: React 18 with routing, hooks, and responsive design
- **Robust Backend**: Node.js/Express API with validation and security
- **Multiple Deployment Options**: Vercel, Netlify, Docker, and more
- **Comprehensive Documentation**: API docs, guides, and examples
- **Scalable Architecture**: Organized folder structure for growth
- **Development Tools**: Linting, testing, and development workflows

## 📁 Project Structure

```
parkers-portfolio/
├── 📱 frontend/              # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   └── styles/          # CSS and styling
│   └── public/              # Static assets
├── 🔧 backend/              # Node.js API server
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Data models
│   │   ├── controllers/     # Route controllers
│   │   ├── config/          # Configuration files
│   │   └── utils/           # Utility functions
│   └── tests/               # Backend tests
├── 🚀 deployment/           # Deployment configurations
│   ├── vercel/              # Vercel deployment
│   ├── netlify/             # Netlify deployment
│   ├── docker/              # Docker containers
│   └── heroku/              # Heroku deployment
├── 📚 docs/                 # Documentation
│   ├── api/                 # API documentation
│   ├── guides/              # Development guides
│   └── examples/            # Code examples
└── 🎨 assets/               # Static assets
    ├── images/              # Project screenshots, photos
    ├── icons/               # SVG icons, logos
    ├── videos/              # Demo videos
    └── fonts/               # Custom fonts
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Modern styling with flexbox/grid
- **React Testing Library** - Testing framework

### Backend  
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Helmet** - Security middleware
- **Morgan** - Logging middleware
- **Express Validator** - Input validation
- **Nodemailer** - Email handling
- **Jest** - Testing framework

### DevOps & Deployment
- **Docker** - Containerization
- **Vercel** - Full-stack deployment
- **Netlify** - Frontend deployment
- **Heroku** - Backend deployment
- **GitHub Actions** - CI/CD (configurable)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/peterparker1718/parkers-portfolio.git
cd parkers-portfolio
```

2. **Install dependencies**
```bash
npm run install:all
```

3. **Set up environment variables**
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

4. **Start development servers**
```bash
npm run dev
```

This starts:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📋 Available Scripts

### Root Level Scripts
```bash
npm run dev              # Start both frontend and backend
npm run build           # Build both applications
npm run test            # Run all tests
npm run lint            # Lint all code
npm run install:all     # Install all dependencies
```

### Frontend Scripts
```bash
cd frontend
npm start               # Start development server
npm run build          # Create production build
npm test               # Run tests
npm run lint           # Lint code
```

### Backend Scripts
```bash
cd backend
npm run dev            # Start with nodemon
npm start             # Start production server
npm test              # Run API tests
npm run lint          # Lint code
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
cd deployment/vercel
./deploy.sh
```

### Netlify (Frontend)
1. Connect GitHub repository to Netlify
2. Set build directory to `frontend/`
3. Deploy automatically on push

### Docker
```bash
cd deployment/docker
docker-compose up --build
```

See [Deployment Guide](docs/guides/deployment.md) for detailed instructions.

## 📖 Documentation

- **[Development Guide](docs/guides/development.md)** - Setup and development workflow
- **[Deployment Guide](docs/guides/deployment.md)** - Deploy to various platforms  
- **[API Documentation](docs/api/README.md)** - Backend API reference
- **[Examples](docs/examples/)** - Code examples and tutorials

## 🧪 Testing

```bash
# Run all tests
npm test

# Frontend tests
cd frontend && npm test

# Backend tests  
cd backend && npm test
```

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API rate limiting
- **Input Validation** - Request validation
- **Environment Variables** - Sensitive data protection

## 🎨 Customization

### Adding New Pages
See [Adding New Page Example](docs/examples/adding-new-page.md)

### Adding API Endpoints
See [Adding API Endpoint Example](docs/examples/adding-api-endpoint.md)

### Styling
- Modify `frontend/src/styles/App.css` for global styles
- Component-specific styles in component files
- Use CSS variables for consistent theming

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests if applicable
5. Run linting and tests: `npm run lint && npm test`
6. Commit your changes: `git commit -m 'Add feature'`
7. Push to the branch: `git push origin feature-name`
8. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Portfolio**: [Your Portfolio URL]
- **Email**: parker@example.com
- **LinkedIn**: [Your LinkedIn]
- **GitHub**: [@peterparker1718](https://github.com/peterparker1718)

---

Made with ❤️ by Parker
