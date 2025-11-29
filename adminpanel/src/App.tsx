import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/Layout/MainLayout';
import Login from './pages/Login';
import AuthDebug from './components/AuthDebug';
import Dashboard from './pages/Dashboard';
import PropertyManagement from './pages/PropertyManagement';
import BlogManagement from './pages/BlogManagement';
import AuthorManagement from './pages/AuthorManagement';
import ContactFormManagement from './pages/ContactFormManagement';
import ContactInfoManagement from './pages/ContactInfoManagement';
import ScheduleVisitManagement from './pages/ScheduleVisitManagement';
import PDFManagement from './pages/PDFManagement';
import AboutManagement from './pages/AboutManagement';
import AchievementManagement from './pages/AchievementManagement';
import WhyChooseUsManagement from './pages/WhyChooseUsManagement';
import CoreStrengthsManagement from './pages/CoreStrengthsManagement';
import FutureVisionManagement from './pages/FutureVisionManagement';
import NewsletterManagement from './pages/NewsletterManagement';
import AboutUsManagement from './pages/AboutUsManagement';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/properties" element={
            <ProtectedRoute>
              <MainLayout>
                <PropertyManagement />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/blogs" element={
            <ProtectedRoute>
              <MainLayout>
                <BlogManagement />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/authors" element={
            <ProtectedRoute>
              <MainLayout>
                <AuthorManagement />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/contact-info" element={
            <ProtectedRoute>
              <MainLayout>
                <ContactInfoManagement />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/contact-forms" element={
            <ProtectedRoute>
              <MainLayout>
                <ContactFormManagement />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/schedule-visits" element={
            <ProtectedRoute>
              <MainLayout>
                <ScheduleVisitManagement />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/pdfs" element={
            <ProtectedRoute>
              <MainLayout>
                <PDFManagement />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <MainLayout>
                <AboutManagement />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/achievements" element={
            <ProtectedRoute>
              <MainLayout>
                <AchievementManagement />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/why-choose-us" element={
            <ProtectedRoute>
              <MainLayout>
                <WhyChooseUsManagement />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/core-strengths" element={
            <ProtectedRoute>
              <MainLayout>
                <CoreStrengthsManagement />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/future-vision" element={
            <ProtectedRoute>
              <MainLayout>
                <FutureVisionManagement />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/newsletter" element={
            <ProtectedRoute>
              <MainLayout>
                <NewsletterManagement />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/about-us" element={
            <ProtectedRoute>
              <MainLayout>
                <AboutUsManagement />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <MainLayout>
                <Settings />
              </MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
        {/* <AuthDebug /> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
