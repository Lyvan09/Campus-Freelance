import { useState, useContext, useEffect } from 'react';
import { Send } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const ApplicationForm = ({ missionId, onSuccess }) => {
  const { user, token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantEmail: '',
    coverMessage: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        applicantName: user.nom || '',
        applicantEmail: user.email || ''
      }));
    }
  }, [user]);

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'applicantEmail' && error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(formData.applicantEmail)) {
      setError("Le format de l'adresse email est invalide.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/missions/${missionId}/apply`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la soumission');
      }

      setFormData({ applicantName: '', applicantEmail: '', coverMessage: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card" style={{ marginTop: '2rem' }}>
      <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Postuler à cette mission</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="applicantName">Nom complet</label>
          <input
            type="text"
            id="applicantName"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            required
            placeholder="Ex: Jean Dupont"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="applicantEmail">Email de contact</label>
          <input
            type="email"
            id="applicantEmail"
            name="applicantEmail"
            value={formData.applicantEmail}
            onChange={handleChange}
            required
            placeholder="jean.dupont@etu.univ-maroua.cm"
            className={error ? 'error' : ''}
          />
          {error && <p className="error-text">{error}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="coverMessage">Message de motivation</label>
          <textarea
            id="coverMessage"
            name="coverMessage"
            value={formData.coverMessage}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Pourquoi êtes-vous le candidat idéal pour cette mission ?"
          />
        </div>

        <button type="submit" className="btn" disabled={isSubmitting} style={{ width: '100%' }}>
          {isSubmitting ? 'Envoi en cours...' : (
            <>
              Envoyer la candidature <Send size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
