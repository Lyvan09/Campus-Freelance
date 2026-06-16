import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, password, role })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erreur d'inscription");
      
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Inscription</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Nom complet</label>
          <input type="text" value={nom} onChange={e => setNom(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Je suis un(e) :</label>
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="student">Étudiant(e)</option>
            <option value="recruiter">Recruteur / Entreprise</option>
          </select>
        </div>
        <button type="submit" className="btn-primary">S'inscrire</button>
      </form>
      <p>Déjà un compte ? <Link to="/login">Connectez-vous ici</Link></p>
    </div>
  );
};

export default Register;
