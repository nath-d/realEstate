import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import PropertyManagement from './pages/PropertyManagement';
import BlogManagement from './pages/BlogManagement';
import AuthorManagement from './pages/AuthorManagement';
import ContactFormManagement from './pages/ContactFormManagement';
import ScheduleVisitManagement from './pages/ScheduleVisitManagement';
import PDFManagement from './pages/PDFManagement';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/properties" element={<PropertyManagement />} />
          <Route path="/blogs" element={<BlogManagement />} />
          <Route path="/authors" element={<AuthorManagement />} />
          <Route path="/contact-forms" element={<ContactFormManagement />} />
          <Route path="/schedule-visits" element={<ScheduleVisitManagement />} />
          <Route path="/pdfs" element={<PDFManagement />} />
          {/* Add more routes here as needed */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
