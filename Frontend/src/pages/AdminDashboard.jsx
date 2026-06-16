import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const [recruiters, setRecruiters] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/recruiters', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setRecruiters(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des recruteurs", error);
    }
  };

  const approveRecruiter = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/recruiters/${id}/approve`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchRecruiters(); // Rafraîchir la liste
      }
    } catch (error) {
      console.error("Erreur lors de l'approbation", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Administration : Validation des Recruteurs</h2>
      <div className="recruiters-list">
        {recruiters.length === 0 ? (
          <p>Aucun recruteur inscrit pour le moment.</p>
        ) : (
          recruiters.map(r => (
            <div key={r._id} className={`recruiter-card ${r.isApproved ? 'approved' : 'pending'}`}>
              <h3>{r.nom}</h3>
              <p>{r.email}</p>
              <div className="status">
                Statut : {r.isApproved ? <span className="text-success">Approuvé</span> : <span className="text-warning">En attente</span>}
              </div>
              {!r.isApproved && (
                <button className="btn-primary" onClick={() => approveRecruiter(r._id)}>
                  Approuver ce compte
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
