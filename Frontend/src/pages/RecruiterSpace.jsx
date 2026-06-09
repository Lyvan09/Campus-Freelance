import { useState, useEffect } from 'react';
import CreateMissionForm from '../components/CreateMissionForm';
import ApplicationCard from '../components/ApplicationCard';
import { Eye, CheckCircle } from 'lucide-react';

const RecruiterSpace = () => {
  const [missions, setMissions] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingApps, setLoadingApps] = useState(false);

  const fetchMissions = () => {
    // Dans une vraie API, on devrait avoir un endpoint /api/missions/all ou /api/missions?recruiter=1
    // car GET /api/missions retourne uniquement les ouvertes. Mais pour ce MVP, on fait simple.
    fetch('http://localhost:5000/api/missions')
      .then(res => res.json())
      .then(data => {
        setMissions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const handleMissionCreated = (newMission) => {
    setMissions(prev => [newMission, ...prev]);
  };

  const handleSelectMission = (mission) => {
    setSelectedMission(mission);
    setLoadingApps(true);
    fetch(`http://localhost:5000/api/missions/${mission._id}/apps`)
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setLoadingApps(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingApps(false);
      });
  };

  const handleCloseMission = async (missionId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/missions/${missionId}/status`, {
        method: 'PATCH',
      });
      if (res.ok) {
        const updated = await res.json();
        setMissions(prev => prev.map(m => m._id === missionId ? updated : m));
        if (selectedMission && selectedMission._id === missionId) {
          setSelectedMission(updated);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Tableau de bord Recruteur</h1>
        <p>Gérez vos offres de missions et consultez les candidatures des étudiants.</p>
      </div>

      <CreateMissionForm onCreated={handleMissionCreated} />

      <h2 style={{ marginBottom: '1.5rem', marginTop: '3rem' }}>Vos missions publiées</h2>
      
      <div className="detail-container">
        <div className="table-container">
          {loading ? <p style={{ padding: '1rem' }}>Chargement...</p> : (
            <table>
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Statut</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {missions.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: 'center' }}>Aucune mission publiée.</td></tr>
                ) : (
                  missions.map(mission => (
                    <tr key={mission._id} style={{ backgroundColor: selectedMission?._id === mission._id ? 'rgba(99, 102, 241, 0.1)' : 'transparent' }}>
                      <td style={{ fontWeight: '500' }}>{mission.title}</td>
                      <td>
                        <span className={`status-badge ${mission.status === 'Ouverte' ? 'status-open' : 'status-closed'}`}>
                          {mission.status}
                        </span>
                      </td>
                      <td>{new Date(mission.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            className="btn" 
                            style={{ padding: '0.5rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                            onClick={() => handleSelectMission(mission)}
                            title="Voir les candidatures"
                          >
                            <Eye size={16} />
                          </button>
                          {mission.status === 'Ouverte' && (
                            <button 
                              className="btn" 
                              style={{ padding: '0.5rem', backgroundColor: 'var(--surface)', border: '1px solid var(--success)', color: 'var(--success)' }}
                              onClick={() => handleCloseMission(mission._id)}
                              title="Marquer comme pourvue"
                            >
                              <CheckCircle size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="applications-view">
          {selectedMission ? (
            <div className="card" style={{ height: '100%' }}>
              <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                Candidatures pour : <span style={{ color: 'var(--primary)' }}>{selectedMission.title}</span>
              </h3>
              
              {loadingApps ? (
                <p>Chargement des candidatures...</p>
              ) : applications.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>Aucune candidature pour le moment.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {applications.map(app => (
                    <ApplicationCard key={app._id} app={app} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', color: 'var(--text-muted)' }}>
              Sélectionnez une mission pour voir ses candidatures
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterSpace;
