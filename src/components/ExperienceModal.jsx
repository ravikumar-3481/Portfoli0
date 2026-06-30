import { motion } from 'framer-motion';

export default function ExperienceModal({ item, onClose }) {
  if (!item) return null;

  return (
    <motion.div 
      className="project-modal" 
      id="expModal"
      style={{ display: 'flex' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="project-modal-content"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      >
        <i className="fas fa-times close-modal" onClick={onClose}></i>
        <div id="expModalBody">
          <div className="modal-project-img" style={{ background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', height: '180px', position: 'relative' }}>
            <img 
              src={`/${item.logo}`} 
              alt={item.company} 
              style={{ maxHeight: '100%', width: 'auto', objectFit: 'contain' }} 
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="project-tag">{item.type}</div>
          </div>
          <div className="modal-project-info">
            <h2>{item.role}</h2>
            <h4 style={{ color: '#a78bfa', marginBottom: '15px', fontWeight: 500 }}>@ {item.company}</h4>
            <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: '#ccc', marginBottom: '20px' }}>
              <span><i className="fas fa-map-marker-alt"></i> {item.location}</span>
              <span><i className="fas fa-calendar-alt"></i> {item.duration}</span>
            </div>
            <div className="project-tech" style={{ marginBottom: '20px' }}>
              {item.skills.map((skill, index) => (
                <span key={index} className="tech-badge">#{skill}</span>
              ))}
            </div>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: '#ddd', lineHeight: '1.6' }}>{item.description}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(145,36,255,0.2)' }}>
              <p style={{ color: '#fff', fontWeight: 600, marginBottom: '10px' }}>Key Responsibilities:</p>
              <ul style={{ paddingLeft: '20px', color: '#aaa', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {item.tasks.map((task, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>{task}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
