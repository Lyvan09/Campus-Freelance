import { Link } from 'react-router-dom';
import { Building2, Clock, ArrowRight } from 'lucide-react';

const MissionCard = ({ mission }) => {
  const date = new Date(mission.createdAt).toLocaleDateString();

  return (
    <div className="card">
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <span className={`status-badge ${mission.status === 'Ouverte' ? 'status-open' : 'status-closed'}`}>
          {mission.status}
        </span>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <Clock size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
          {date}
        </span>
      </div>
      
      <h3 className="card-title">{mission.title}</h3>
      <div className="card-company">
        <Building2 size={16} />
        {mission.company}
      </div>
      
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {mission.description}
      </p>

      <div className="tags">
        {mission.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Link to={`/missions/${mission._id}`} className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
          Voir l'offre <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default MissionCard;
