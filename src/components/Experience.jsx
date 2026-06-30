import { useState, useEffect } from 'react';

export default function Experience({ onViewDetails }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/assets/data/experience.json')
      .then(res => res.json())
      .then(data => {
        setExperiences(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load experience:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="experience-section reveal active" id="experience">
      <div className="section-tittle">
        <h1>Experience</h1>
        <div className="tittle-under"></div>
        <p className="section-description">A timeline of my journey in web development and technical leadership.</p>
      </div>

      <div className="experience-grid" id="experience-container">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          experiences.map((item) => (
            <div key={item.id} className="exp-card project-card" style={{ padding: '1.5rem' }}>
              <div className="project-info" style={{ padding: 0, display: 'flex', flexDirection: 'column', height: '100%', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="exp-logo-box" style={{ width: '55px', height: '55px', background: '#fff', borderRadius: '12px', padding: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={`/${item.logo}`} 
                      alt={item.company} 
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextElementSibling) {
                          e.target.nextElementSibling.style.display = 'block';
                        }
                      }}
                    />
                    <span style={{ display: 'none', color: '#000', fontWeight: 'bold', fontSize: '1.5rem' }}>
                      {item.company.charAt(0)}
                    </span>
                  </div>
                  <span className="tech-badge" style={{ background: 'rgba(145,36,255,0.15)', borderColor: 'rgba(145,36,255,0.3)', color: '#d1a3ff', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                    {item.type}
                  </span>
                </div>
                
                <div>
                  <h3 style={{ marginBottom: '5px', color: '#fff', fontSize: '1.25rem', fontWeight: 600 }}>{item.role}</h3>
                  <p style={{ color: '#a78bfa', marginBottom: '12px', fontWeight: 500, fontSize: '0.95rem' }}>{item.company}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '5px' }}>
                    <span><i className="far fa-calendar-alt" style={{ color: '#9124ff' }}></i> {item.duration}</span>
                    <span><i className="fas fa-map-marker-alt" style={{ color: '#9124ff' }}></i> {item.location}</span>
                  </div>
                </div>

                <div className="project-tech" style={{ marginBottom: '5px' }}>
                  {item.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="tech-badge">#{skill}</span>
                  ))}
                  {item.skills.length > 3 && (
                    <span className="tech-badge">+{item.skills.length - 3}</span>
                  )}
                </div>

                <div className="project-btns-group" style={{ marginTop: 'auto', paddingTop: '10px' }}>
                  <button onClick={() => onViewDetails(item)} className="view-more-modern">
                    View Details <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
