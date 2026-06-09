import { useState, useEffect } from 'react';
import MissionCard from '../components/MissionCard';

const StudentSpace = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/missions')
      .then(res => res.json())
      .then(data => {
        setMissions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur de chargement des missions:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="header">
        <h1>Missions Campus Freelance</h1>
        <p>Découvrez les missions disponibles et postulez pour développer vos compétences.</p>
      </div>

      {loading ? (
        <p>Chargement des missions...</p>
      ) : missions.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>Aucune mission ouverte pour le moment.</p>
        </div>
      ) : (
        <div className="grid">
          {missions.map(mission => (
            <MissionCard key={mission._id} mission={mission} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentSpace;
