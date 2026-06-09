import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ApplicationForm from './ApplicationForm';
import { Building2, Clock, ArrowLeft } from 'lucide-react';

const MissionDetail = () => {
  const { id } = useParams();
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    // We only fetch all missions and find the one since there's no GET /api/missions/:id required,
    // but in a real app we'd have a specific route. For MVP, we filter.
    fetch('http://localhost:5000/api/missions')
      .then(res => res.json())
      .then(data => {
        const found = data.find(m => m._id === id);
        setMission(found);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (!mission) return <div className="container">Mission introuvable.</div>;

  return (
    <div>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontWeight: '500' }}>
        <ArrowLeft size={16} /> Retour aux missions
      </Link>

      <div className="detail-container">
        <div className="mission-info">
          <div className="card">
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
              <span className="status-badge status-open">{mission.status}</span>
              <span style={{ color: 'var(--text-muted)' }}><Clock size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> {new Date(mission.createdAt).toLocaleDateString()}</span>
            </div>

            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{mission.title}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              <Building2 size={20} />
              {mission.company}
            </div>

            <div className="tags" style={{ marginBottom: '2rem' }}>
              {mission.tags.map((tag, i) => (
                <span key={i} className="tag" style={{ fontSize: '0.875rem' }}>{tag}</span>
              ))}
            </div>

            <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
              <h3 style={{ marginBottom: '1rem' }}>Description de la mission</h3>
              <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-muted)' }}>
                {mission.description}
              </div>
            </div>
          </div>
        </div>

        <div className="application-section">
          {successMsg ? (
            <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
              <h3 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Candidature envoyée !</h3>
              <p style={{ color: 'var(--text-muted)' }}>Votre candidature a bien été transmise au recruteur. Bonne chance !</p>
            </div>
          ) : (
            <ApplicationForm missionId={mission._id} onSuccess={() => setSuccessMsg(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionDetail;
