import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import MainApp from './MainApp';

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          {/* Corrected path with colon for dynamic parameter */}
          <Route path="/app/:userId" element={<MainApp />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;