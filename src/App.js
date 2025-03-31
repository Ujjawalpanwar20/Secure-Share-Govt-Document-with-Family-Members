import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import UploadDocument from "./components/UploadDocument";
import ShareDocument from "./components/ShareDocument";
import { AuthProvider } from "./context/AuthContext";

// Protected Route Wrapper
const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/upload" element={<ProtectedRoute element={<UploadDocument />} />} />
          <Route path="/share" element={<ProtectedRoute element={<ShareDocument />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
