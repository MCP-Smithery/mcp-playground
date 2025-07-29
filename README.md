# Smithery.ai - AI Tools Platform

A comprehensive full-stack TypeScript application for building, sharing, and deploying AI tools. Built with Express.js backend and React frontend, featuring Model Context Protocol (MCP) tool integration.

## 🚀 Features

- **AI Tools Marketplace**: Browse and discover powerful AI tools
- **MCP Integration**: Seamless integration with Model Context Protocol
- **Developer-Friendly**: REST APIs with comprehensive documentation
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **TypeScript**: Full type safety across frontend and backend
- **Real-time APIs**: Fast and reliable API endpoints
- **Contact System**: Built-in contact form with validation

## 🏗️ Architecture

### Backend (Express.js + TypeScript)
- RESTful API design
- Security middleware (Helmet, CORS, Rate limiting)
- Modular route structure
- TypeScript interfaces and type safety
- Mock data for development (easily replaceable with real database)

### Frontend (React + TypeScript)
- Modern React with hooks
- React Router for navigation
- Tailwind CSS for styling
- Axios for API communication
- Responsive design
- Component-based architecture

## 📁 Project Structure

```
smithery-ai/
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── types/          # TypeScript interfaces
│   │   └── server.ts       # Main server file
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   ├── types/          # TypeScript interfaces
│   │   └── App.tsx         # Main app component
│   ├── package.json
│   └── vite.config.ts
└── package.json           # Root workspace configuration
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smithery-ai
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:8000
   - Frontend development server on http://localhost:3000

### Manual Setup

If you prefer to set up each part individually:

1. **Install root dependencies**
   ```bash
   npm install
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🔧 Development

### Available Scripts

**Root level:**
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run install:all` - Install dependencies for all workspaces

**Backend:**
- `npm run dev` - Start backend in development mode with hot reload
- `npm run build` - Build backend for production
- `npm run start` - Start production backend
- `npm run type-check` - Run TypeScript type checking

**Frontend:**
- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Endpoints

#### Tools
- `GET /api/tools` - Get all tools with optional filtering
- `GET /api/tools/:id` - Get specific tool by ID
- `POST /api/tools` - Create new tool
- `PUT /api/tools/:id` - Update tool
- `DELETE /api/tools/:id` - Delete tool

#### Blog
- `GET /api/blog` - Get blog posts
- `GET /api/blog/:slug` - Get specific blog post

#### Documentation
- `GET /api/documentation` - Get documentation sections
- `GET /api/documentation/:id` - Get specific documentation section

#### Contact
- `POST /api/contact` - Submit contact message

#### Health Check
- `GET /api/health` - API health status

### Example API Usage

```typescript
// Fetch all tools
const response = await fetch('/api/tools');
const data = await response.json();

// Search tools
const response = await fetch('/api/tools?q=github&category=Development');
const data = await response.json();

// Submit contact form
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'General Inquiry',
    message: 'Hello, I have a question...'
  })
});
```

## 🎨 Frontend Features

### Pages
- **Home**: Landing page with features and call-to-action
- **Tools**: Marketplace with search and filtering
- **Tool Details**: Individual tool information
- **Documentation**: Platform documentation
- **Blog**: Blog posts and articles
- **Contact**: Contact form with validation

### Components
- **Layout**: Main layout with navigation and footer
- **Navigation**: Responsive navigation with mobile menu
- **Tool Cards**: Beautiful tool display cards
- **Search**: Advanced search and filtering
- **Forms**: Validated contact forms

### Styling
- Tailwind CSS for utility-first styling
- Custom color palette and design system
- Responsive design for all screen sizes
- Modern UI components and interactions

## 🚀 Deployment

### Backend Deployment
1. Build the backend: `npm run build`
2. Set production environment variables
3. Deploy to your preferred platform (Heroku, AWS, etc.)
4. Start with: `npm start`

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)
3. Update API base URL for production

## 🛡️ Security Features

- CORS configuration
- Rate limiting
- Helmet.js security headers
- Input validation
- XSS protection
- CSRF protection ready

## 📈 Performance

- Optimized bundle sizes
- Lazy loading ready
- API response caching
- Image optimization
- Code splitting support

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or need help:

1. Check the documentation in the `/docs` folder
2. Open an issue on GitHub
3. Use the contact form in the application
4. Email: support@smithery.ai

## 🗺️ Roadmap

- [ ] User authentication and authorization
- [ ] Real database integration (PostgreSQL/MongoDB)
- [ ] Tool marketplace with ratings and reviews
- [ ] Advanced search with Elasticsearch
- [ ] Real-time notifications
- [ ] Tool analytics dashboard
- [ ] API versioning
- [ ] Comprehensive testing suite
- [ ] Docker containerization
- [ ] CI/CD pipeline

---

Built with ❤️ by the Smithery.ai team