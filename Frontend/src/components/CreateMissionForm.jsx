import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const CreateMissionForm = ({ onCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    try {
      const response = await fetch('http://localhost:5000/api/missions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...formData, tags: tagsArray })
      });

      if (!response.ok) throw new Error('Erreur de création');
      
      const newMission = await response.json();
      setFormData({ title: '', company: '', description: '', tags: '' });
      if (onCreated) onCreated(newMission);
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la création de la mission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <h2 className="card-title" style={{ marginBottom: '1.5rem' }}>Publier une nouvelle mission</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">Titre de la mission</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required placeholder="Ex: Développeur React Freelance" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="company">Nom de l'entreprise / entité</label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required placeholder="Ex: ENSPM ou TechCorp" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="tags">Compétences (séparées par des virgules)</label>
          <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} placeholder="Ex: React, Node.js, Design" />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">Description détaillée</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={4} placeholder="Décrivez la mission, les attentes, la rémunération..." />
        </div>

        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Publication en cours...' : 'Publier la mission'}
        </button>
      </form>
    </div>
  );
};

export default CreateMissionForm;
