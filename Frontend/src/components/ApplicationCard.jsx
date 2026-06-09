import { User, Mail, Calendar } from 'lucide-react';

const ApplicationCard = ({ app }) => {
  return (
    <div className="card" style={{ marginBottom: '1rem', borderLeft: '4px solid var(--primary)' }}>
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 0 }}>
          <User size={18} color="var(--primary)" />
          {app.applicantName}
        </h3>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <Calendar size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
          {new Date(app.appliedAt).toLocaleString()}
        </span>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <a href={`mailto:${app.applicantEmail}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <Mail size={16} /> {app.applicantEmail}
        </a>
      </div>

      <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', color: 'var(--text-muted)' }}>
        <p style={{ margin: 0, fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>"{app.coverMessage}"</p>
      </div>
    </div>
  );
};

export default ApplicationCard;
