import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { HomePage } from './pages/HomePage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { LoginPage } from './pages/auth/LoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboard';
import { FreelancerDashboardPage } from './pages/freelancer/DashboardPage';
import { ClientDashboardPage } from './pages/client/ProjectDashboard';
import { FindWorkPage } from './pages/work/FindWork';
import { PostProjectPage } from './pages/work/PostProject';
import { WebDevelopment } from './pages/WebDevelopment';
import { MLModelsPage } from './pages/services/ml-models/MLModelsPage';
import { DeepLearningPage } from './pages/services/deep-learning/DeepLearningPage';
import { NLPPage } from './pages/services/nlp/NLPPage';
import { ComputerVisionPage } from './pages/services/computer-vision/ComputerVisionPage';
import { RLPage } from './pages/services/reinforcement-learning/RLPage';
import { AIGamingPage } from './pages/services/ai-gaming/AIGamingPage';
import { AIIntegrationPage } from './pages/services/ai-integration/AIIntegrationPage';
import { ChatbotPage } from './pages/services/chatbot/ChatbotPage';
import { AutomationPage } from './pages/services/ai-automation/AutomationPage';
import { VoiceAssistantsPage } from './pages/services/voice-assistants/VoiceAssistantsPage';
import { BlogArchivePage } from './pages/blog/BlogArchivePage';
import { AIFreelancePost } from './pages/blog/posts/AIFreelancePost';
import { AIKnowledgeBasePage } from './pages/resources/AIKnowledgeBase';
import { AIIndustriesPage } from './pages/services/AIIndustriesPage';
import { AIRetailPage } from './pages/services/ai-retail/AIRetailPage';
import { AIRealEstatePage } from './pages/services/ai-real-estate/AIRealEstatePage';
import { AIHealthcarePage } from './pages/services/ai-healthcare/AIHealthcarePage';
import { AITravelPage } from './pages/services/ai-travel/AITravelPage';
import { AIAgriculturePage } from './pages/services/ai-agriculture/AIAgriculturePage';
import { useAuth } from './contexts/AuthContext';

function DashboardRouter() {
  const { user } = useAuth();
  const userRole = user?.user_metadata?.role || 'freelancer';

  switch (userRole) {
    case 'admin':
      return <AdminDashboardPage />;
    case 'client':
      return <ClientDashboardPage />;
    default:
      return <FreelancerDashboardPage />;
  }
}

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/signup" element={<Layout><SignUpPage /></Layout>} />
      <Route path="/login" element={<Layout><LoginPage /></Layout>} />
      
      {/* Dashboard route - will render appropriate dashboard based on user role */}
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Layout><DashboardRouter /></Layout>
          </PrivateRoute>
        }
      />

      {/* Protected routes */}
      <Route 
        path="/find-work" 
        element={
          <PrivateRoute>
            <Layout><FindWorkPage /></Layout>
          </PrivateRoute>
        }
      />
      <Route 
        path="/post-project" 
        element={
          <PrivateRoute>
            <Layout><PostProjectPage /></Layout>
          </PrivateRoute>
        }
      />

      {/* Public service pages */}
      <Route path="/services/web-development" element={<Layout><WebDevelopment /></Layout>} />
      <Route path="/services/ai/ml-models" element={<Layout><MLModelsPage /></Layout>} />
      <Route path="/services/ai/deep-learning" element={<Layout><DeepLearningPage /></Layout>} />
      <Route path="/services/ai/nlp" element={<Layout><NLPPage /></Layout>} />
      <Route path="/services/ai/computer-vision" element={<Layout><ComputerVisionPage /></Layout>} />
      <Route path="/services/ai/reinforcement-learning" element={<Layout><RLPage /></Layout>} />
      <Route path="/services/ai/gaming" element={<Layout><AIGamingPage /></Layout>} />
      <Route path="/services/ai/integration" element={<Layout><AIIntegrationPage /></Layout>} />
      <Route path="/services/ai/chatbots" element={<Layout><ChatbotPage /></Layout>} />
      <Route path="/services/ai/automation" element={<Layout><AutomationPage /></Layout>} />
      <Route path="/services/ai/voice-assistants" element={<Layout><VoiceAssistantsPage /></Layout>} />
      
      {/* AI Industry Solutions */}
      <Route path="/services/ai/industries" element={<Layout><AIIndustriesPage /></Layout>} />
      <Route path="/services/ai/retail" element={<Layout><AIRetailPage /></Layout>} />
      <Route path="/services/ai/real-estate" element={<Layout><AIRealEstatePage /></Layout>} />
      <Route path="/services/ai/healthcare" element={<Layout><AIHealthcarePage /></Layout>} />
      <Route path="/services/ai/travel" element={<Layout><AITravelPage /></Layout>} />
      <Route path="/services/ai/agriculture" element={<Layout><AIAgriculturePage /></Layout>} />

      {/* Blog and Resources */}
      <Route path="/blog" element={<Layout><BlogArchivePage /></Layout>} />
      <Route path="/blog/posts/1" element={<Layout><AIFreelancePost /></Layout>} />
      <Route path="/resources/knowledge-base" element={<Layout><AIKnowledgeBasePage /></Layout>} />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}