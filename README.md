# 🌍 NomadNest - AI-Powered Travel Planning Platform

A modern, full-stack travel planning application that uses AI to generate personalized itineraries for destinations worldwide.

## ✨ Features

- **🤖 AI-Powered Itinerary Generation**: Uses OpenAI GPT to create personalized travel plans
- **🔐 User Authentication**: Secure Google OAuth integration with NextAuth.js
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🗺️ Destination Explorer**: Browse curated destinations with filtering
- **💾 Save & Manage**: Save, view, and manage your travel itineraries
- **🎨 Modern UI/UX**: Beautiful, intuitive interface with smooth animations
- **⚡ Real-time Updates**: Instant feedback and loading states
- **🛡️ Rate Limiting**: Protected API endpoints with Redis-based rate limiting
- **🚀 Caching**: Redis caching for improved performance
- **📊 Analytics**: Built-in analytics and error tracking
- **🧪 Testing**: Comprehensive unit and E2E tests
- **🔄 CI/CD**: Automated deployment pipeline

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **NextAuth.js** - Authentication solution
- **Redis** - Caching and rate limiting
- **OpenAI API** - AI itinerary generation

### DevOps & Testing
- **Jest** - Unit testing
- **Playwright** - E2E testing
- **GitHub Actions** - CI/CD pipeline
- **Vercel** - Deployment platform

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Redis instance
- OpenAI API key
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nomadnest.git
   cd nomadnest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   REDIS_URL=redis://localhost:6379
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Unit Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### E2E Tests
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode
npx playwright test --ui
```

## 📁 Project Structure

```
nomadnest/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   │   ├── analytics/  # Analytics endpoints
│   │   │   └── itinerary/  # Itinerary endpoints
│   │   ├── explore/        # Destination explorer page
│   │   ├── saved/          # Saved itineraries page
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable components
│   │   ├── ui/            # Shadcn/ui components
│   │   ├── Navbar.tsx     # Navigation component
│   │   └── Logo.tsx       # Logo component
│   ├── lib/               # Utility functions
│   │   ├── auth.ts        # NextAuth configuration
│   │   ├── cache.ts       # Redis caching
│   │   ├── rate-limit.ts  # Rate limiting
│   │   ├── analytics.ts   # Analytics tracking
│   │   ├── validation.ts  # Input validation
│   │   └── utils.ts       # Helper functions
│   ├── models/            # MongoDB models
│   │   └── Itinerary.ts   # Itinerary schema
│   └── __tests__/         # Unit tests
├── e2e/                   # E2E tests
├── .github/workflows/     # CI/CD pipelines
├── public/                # Static assets
│   └── images/           # Destination images
└── types/                # TypeScript type definitions
```

## 🔧 Key Features Implementation

### AI Itinerary Generation
- Integrates with OpenAI API for intelligent travel planning
- Fallback mechanisms for API failures
- Contextual prompts based on user interests and duration
- Caching for improved performance

### User Authentication
- Google OAuth integration
- Session management with NextAuth.js
- Protected API routes
- Rate limiting for security

### Database Design
- MongoDB with Mongoose ODM
- User-specific itinerary storage
- Timestamp tracking for all records
- Redis caching layer

### Performance & Security
- Redis-based caching for faster responses
- Rate limiting to prevent abuse
- Input validation with Zod
- Error tracking and analytics

### Testing Strategy
- Unit tests for components and utilities
- Integration tests for API endpoints
- E2E tests for user workflows
- Automated CI/CD pipeline

## 🎯 Portfolio Highlights

This project demonstrates:

- **Full-Stack Development**: Complete application with frontend and backend
- **AI Integration**: Real-world AI implementation with OpenAI
- **Authentication**: Secure user management with OAuth
- **Database Design**: MongoDB schema design and optimization
- **API Development**: RESTful API with proper error handling
- **Performance Optimization**: Caching and rate limiting
- **Testing**: Comprehensive test coverage
- **DevOps**: CI/CD pipeline and deployment
- **Modern React**: Next.js 15 with App Router
- **TypeScript**: Type-safe development practices
- **Responsive Design**: Mobile-first responsive UI
- **Monitoring**: Analytics and error tracking

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically via CI/CD

### Environment Variables for Production
```env
MONGODB_URI=your_production_mongodb_uri
OPENAI_API_KEY=your_openai_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_production_secret
NEXTAUTH_URL=https://your-domain.com
REDIS_URL=your_redis_url
```

### Other Platforms
- **Netlify**: Compatible with Next.js
- **Railway**: Easy MongoDB and Redis integration
- **Heroku**: Traditional deployment option

## 🔄 CI/CD Pipeline

The project includes a comprehensive CI/CD pipeline:

1. **Automated Testing**: Runs on every push and PR
2. **Code Quality**: Linting and type checking
3. **Test Coverage**: Unit and E2E tests
4. **Build Verification**: Ensures production builds work
5. **Automated Deployment**: Deploys to production on main branch

## 📊 Monitoring & Analytics

- **Built-in Analytics**: Track user interactions and events
- **Error Tracking**: Monitor and alert on application errors
- **Performance Monitoring**: Cache hit rates and response times
- **Rate Limiting**: Monitor API usage and abuse prevention

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests (`npm test`)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [Your Portfolio](https://yourportfolio.com)

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- Next.js team for the amazing framework
- Vercel for hosting and deployment
- The open-source community for inspiration

---

⭐ **Star this repository if you found it helpful!**
