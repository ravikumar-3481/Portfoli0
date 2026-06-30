import { useState, useEffect } from 'react';

export default function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/assets/data/education.json')
      .then(res => res.json())
      .then(data => {
        setEducation(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load education:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="education-section reveal active" id="education">
      <div className="section-tittle">
        <h1>Education</h1>
        <div className="tittle-under"></div>
      </div>

      <div className="education-grid" id="education-container">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          education.map((edu) => (
            <div key={edu.id} className="education-card">
              <div className="edu-header">
                <img 
                  src={`/${edu.logo}`} 
                  alt={edu.institute} 
                  className="edu-logo" 
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/60';
                  }}
                />
                <div className="edu-info">
                  <h3>{edu.degree}</h3>
                  <span>{edu.institute}</span>
                </div>
              </div>
              <div className="edu-details">
                <p>{edu.description}</p>
              </div>
              <div className="edu-skills">
                {edu.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">#{skill}</span>
                ))}
              </div>
              <div className="edu-meta">
                <span className="edu-duration">
                  <i className="far fa-calendar-alt"></i> {edu.duration}
                </span>
                <span className="edu-cgpa">CGPA: {edu.cgpa}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
