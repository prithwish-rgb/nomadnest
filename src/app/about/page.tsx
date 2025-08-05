import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Brain, 
  Shield, 
  Smartphone, 
  Database, 
  Zap,
  Code,
  Palette,
  Users,
  Lock
} from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Planning",
      description: "Advanced AI algorithms create personalized travel itineraries based on your interests and preferences."
    },
    {
      icon: Globe,
      title: "Global Destinations",
      description: "Explore curated destinations worldwide with detailed information and beautiful imagery."
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Safe and secure Google OAuth integration with NextAuth.js for user management."
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Responsive design that works perfectly on all devices, from mobile to desktop."
    },
    {
      icon: Database,
      title: "Data Persistence",
      description: "MongoDB integration for reliable data storage and retrieval of your travel plans."
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Instant feedback and loading states for a smooth user experience."
    }
  ];

  const techStack = [
    { name: "Next.js 15", category: "Framework" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "MongoDB", category: "Database" },
    { name: "OpenAI API", category: "AI" },
    { name: "NextAuth.js", category: "Auth" },
    { name: "Framer Motion", category: "Animation" },
    { name: "React Hook Form", category: "Forms" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-rose-100 to-violet-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-violet-700 mb-4">
            About NomadNest
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A modern, full-stack travel planning platform that combines the power of AI with 
            beautiful design to help you create unforgettable travel experiences.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              NomadNest was built to revolutionize travel planning by leveraging artificial intelligence 
              to create personalized, intelligent itineraries. We believe that every journey should be 
              unique and tailored to individual preferences, interests, and travel styles.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <feature.icon className="h-8 w-8 text-violet-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((tech, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-sm py-2 px-3 bg-white/80 backdrop-blur-sm"
              >
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Development Highlights */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Development Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Code className="h-5 w-5 text-violet-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Full-Stack Development</h4>
                <p className="text-gray-600 text-sm">
                  Complete application with frontend, backend, and database integration
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Brain className="h-5 w-5 text-violet-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">AI Integration</h4>
                <p className="text-gray-600 text-sm">
                  Real-world AI implementation with OpenAI GPT for intelligent content generation
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-violet-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Security & Authentication</h4>
                <p className="text-gray-600 text-sm">
                  Secure user authentication with OAuth and protected API routes
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Palette className="h-5 w-5 text-violet-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Modern UI/UX</h4>
                <p className="text-gray-600 text-sm">
                  Beautiful, responsive design with smooth animations and intuitive navigation
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-violet-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">User Experience</h4>
                <p className="text-gray-600 text-sm">
                  Focus on user experience with loading states, error handling, and feedback
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
