import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import PropertyManagement from './pages/PropertyManagement';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/properties" element={<PropertyManagement />} />
          {/* Add more routes here as needed */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
