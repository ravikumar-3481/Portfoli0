import { useState, useEffect } from 'react';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/assets/data/activities.json')
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load activities:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="extra-curricular" className="activities-section">
      <div className="section-tittle reveal active">
        <h1>Activities</h1>
        <div className="tittle-under"></div>
        <p className="section-description">Beyond the code: My contributions and engagements.</p>
      </div>

      <div id="activities-container" className="activities-grid reveal active">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : activities.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Information temporarily unavailable.</p>
        ) : (
          activities.map((item, index) => (
            <div key={index} className="activity-card">
              <div className="activity-icon">
                <i className={item.icon}></i>
              </div>
              <span className="activity-inst">{item.institute}</span>
              <h3>{item.title}</h3>
              <p className="activity-desc">{item.description}</p>
              <div className="activity-duration">
                <i className="far fa-clock"></i> {item.duration}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
