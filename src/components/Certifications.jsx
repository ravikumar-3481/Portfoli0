import { useState, useEffect } from 'react';

export default function Certifications() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/assets/data/certificates.json')
      .then(res => res.json())
      .then(data => {
        setCerts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load certificates:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="cert-section reveal active" id="certificates">
      <div className="section-tittle">
        <h1>Certifications</h1>
        <div className="tittle-under"></div>
        <p className="section-description">Validated expertise and professional achievements.</p>
      </div>

      <div className="cert-grid" id="cert-container">
        {loading ? (
          <div className="loading">Loading certificates...</div>
        ) : certs.length === 0 ? (
          <p>No certificates found.</p>
        ) : (
          certs.map((cert) => (
            <div key={cert.id} className="cert-card">
              <div className="cert-img-box">
                <img 
                  src={`/assets/img/${cert.image}`} 
                  alt={cert.title} 
                  loading="lazy" 
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=Certificate';
                  }}
                />
              </div>
              <div className="cert-info">
                <div className="cert-issuer-row">
                  <span className="cert-issuer">
                    <i className="fas fa-certificate"></i> {cert.issuer}
                  </span>
                  <span className="cert-date">{cert.date}</span>
                </div>
                <h3>{cert.title}</h3>
                <p className="cert-text">{cert.description}</p>
                
                <div className="cert-tags">
                  {cert.skills.map((skill, index) => (
                    <span key={index} className="cert-tag">#{skill}</span>
                  ))}
                </div>

                <a href={cert.link} target="_blank" className="cert-link" rel="noopener noreferrer">
                  Verify Credential <i className="fas fa-external-link-alt" style={{ marginLeft: '5px', fontSize: '0.8rem' }}></i>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
