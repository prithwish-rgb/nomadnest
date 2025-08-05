# 🚀 Deployment Guide for NomadNest

## Prerequisites

Before deploying, ensure you have the following services set up:

### 1. **MongoDB Database**
- Create a MongoDB Atlas account or use a local MongoDB instance
- Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/nomadnest`

### 2. **Redis Instance**
- **Option A**: Redis Cloud (recommended for production)
- **Option B**: Upstash Redis (serverless)
- **Option C**: Local Redis for development

### 3. **OpenAI API Key**
- Sign up at [OpenAI](https://platform.openai.com/)
- Generate an API key with sufficient credits

### 4. **Google OAuth Credentials**
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select existing
- Enable Google+ API
- Create OAuth 2.0 credentials
- Add authorized redirect URIs:
  - `http://localhost:3000/api/auth/callback/google` (development)
  - `https://your-domain.vercel.app/api/auth/callback/google` (production)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nomadnest?retryWrites=true&w=majority

# Authentication (NextAuth.js)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OpenAI API
OPENAI_API_KEY=your-openai-api-key

# Redis
REDIS_URL=redis://localhost:6379

# Environment
NODE_ENV=development
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard**
   - Go to your project settings
   - Add all environment variables from `.env.local`
   - Update `NEXTAUTH_URL` to your Vercel domain

4. **Configure Custom Domain (Optional)**
   - Add your domain in Vercel dashboard
   - Update DNS records as instructed

### Option 2: Railway

1. **Connect GitHub Repository**
   - Go to [Railway](https://railway.app/)
   - Connect your GitHub account
   - Select the NomadNest repository

2. **Add Services**
   - Add MongoDB service
   - Add Redis service
   - Configure environment variables

3. **Deploy**
   - Railway will automatically deploy on push to main branch

### Option 3: DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository
   - Select Node.js environment

2. **Add Databases**
   - Add MongoDB managed database
   - Add Redis managed database

3. **Configure Environment Variables**
   - Add all required environment variables

## Post-Deployment Checklist

### ✅ Verify Core Functionality
- [ ] Home page loads correctly
- [ ] User authentication works
- [ ] AI itinerary generation functions
- [ ] Saved itineraries are accessible
- [ ] Rate limiting is working
- [ ] Caching is operational

### ✅ Security Checks
- [ ] Environment variables are properly set
- [ ] API endpoints are protected
- [ ] Authentication is working
- [ ] Rate limiting is active
- [ ] HTTPS is enabled

### ✅ Performance Optimization
- [ ] Images are optimized
- [ ] Caching is working
- [ ] API responses are fast
- [ ] Bundle size is reasonable

### ✅ Monitoring Setup
- [ ] Error tracking is configured
- [ ] Analytics are working
- [ ] Performance monitoring is active

## Troubleshooting

### Common Issues

1. **Authentication Not Working**
   - Check Google OAuth redirect URIs
   - Verify `NEXTAUTH_URL` is correct
   - Ensure `NEXTAUTH_SECRET` is set

2. **Database Connection Issues**
   - Verify MongoDB connection string
   - Check network access to MongoDB
   - Ensure database user has correct permissions

3. **Redis Connection Issues**
   - Verify Redis URL format
   - Check Redis service is running
   - Ensure network access to Redis

4. **AI Generation Failing**
   - Check OpenAI API key is valid
   - Verify API key has sufficient credits
   - Check rate limits on OpenAI account

### Performance Issues

1. **Slow Loading Times**
   - Enable Redis caching
   - Optimize images
   - Check bundle size

2. **API Timeouts**
   - Increase timeout limits
   - Optimize database queries
   - Check external API limits

## Maintenance

### Regular Tasks
- Monitor error logs
- Check API usage and costs
- Update dependencies
- Backup database
- Monitor performance metrics

### Updates
- Keep Next.js updated
- Update security dependencies
- Monitor for security advisories
- Test updates in staging environment

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review error logs
3. Test in development environment
4. Create an issue in the GitHub repository 