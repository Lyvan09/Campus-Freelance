import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const MissionHistory = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const fetchHistory = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      let url = 'http://localhost:5000/api/missions/history?';
      if (startDate) url += `startDate=${startDate}&`;
      if (endDate) url += `endDate=${endDate}&`;

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setMissions(data);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="history-page">
      <h2>Historique des missions pourvues</h2>
      
      <form onSubmit={fetchHistory} className="date-filter-form">
        <div className="form-group">
          <label>Date de début</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Date de fin</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
        <button type="submit" className="btn-primary">Filtrer</button>
      </form>

      <div className="history-list">
        {loading ? <p>Chargement...</p> : (
          missions.length === 0 ? (
            <p>Aucune mission pourvue sur cette période.</p>
          ) : (
            missions.map(m => (
              <div key={m._id} className="mission-card history-card">
                <h3>{m.title}</h3>
                <p className="company-name">{m.company}</p>
                <p className="date-info">
                  Terminée le : {new Date(m.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default MissionHistory;
