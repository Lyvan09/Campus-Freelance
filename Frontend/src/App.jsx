import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import StudentSpace from './pages/StudentSpace';
import RecruiterSpace from './pages/RecruiterSpace';
import MissionDetail from './components/MissionDetail';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminDashboard from './pages/AdminDashboard';
import MissionHistory from './pages/MissionHistory';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Briefcase, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Briefcase size={28} color="var(--primary)" />
          Campus<span>Freelance</span>
        </div>
        <div className="navbar-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
            Missions
          </NavLink>
          {user && (user.role === 'recruiter' || user.role === 'admin') && (
            <NavLink to="/recruiter" className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
              Espace Recruteur
            </NavLink>
          )}
          {user && (
            <NavLink to="/history" className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
              Historique
            </NavLink>
          )}
          {user && user.role === 'admin' && (
            <NavLink to="/admin" className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
              Admin
            </NavLink>
          )}
          
          <div className="auth-menu" style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {user ? (
              <>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{user.nom}</span>
                <button onClick={handleLogout} className="btn-icon" title="Se déconnecter" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}>
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <NavLink to="/login" className="btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1rem' }}>
                Connexion
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<StudentSpace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Routes nécessitant d'être connecté */}
            <Route element={<ProtectedRoute />}>
              <Route path="/missions/:id" element={<MissionDetail />} />
              <Route path="/history" element={<MissionHistory />} />
            </Route>

            {/* Routes Recruteur */}
            <Route element={<ProtectedRoute allowedRoles={['recruiter', 'admin']} />}>
              <Route path="/recruiter" element={<RecruiterSpace />} />
            </Route>

            {/* Routes Admin */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
