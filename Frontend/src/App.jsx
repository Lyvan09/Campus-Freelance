import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import StudentSpace from './pages/StudentSpace';
import RecruiterSpace from './pages/RecruiterSpace';
import MissionDetail from './components/MissionDetail';
import { Briefcase } from 'lucide-react';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Briefcase size={28} color="var(--primary)" />
            Campus<span>Freelance</span>
          </div>
          <div className="navbar-links">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
              Espace Étudiant
            </NavLink>
            <NavLink to="/recruiter" className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
              Espace Recruteur
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<StudentSpace />} />
          <Route path="/missions/:id" element={<MissionDetail />} />
          <Route path="/recruiter" element={<RecruiterSpace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
