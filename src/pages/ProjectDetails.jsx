import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    fetch('/assets/data/projects.json')
      .then(res => {
        if (!res.ok) throw new Error("Could not fetch project data");
        return res.json();
      })
      .then(data => {
        const found = data.find(p => p.id.toString() === id);
        if (found) {
          setProject(found);
        } else {
          setError("Project Not Found");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading project:", err);
        setError("Error loading project details");
        setLoading(false);
      });
  }, [id]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="project-detail-page-wrapper">
      <Navbar />

      <main className="project-detail-page" id="project-content">
        {loading ? (
          <div className="loader-container" style={{ minHeight: '50vh' }}>
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h2>{error}</h2>
            <Link to="/#projects" className="pd-btn pd-btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
              Back to Projects
            </Link>
          </div>
        ) : (
          <div className="pd-wrapper">
            <motion.div 
              className="pd-header"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="pd-category">
                {project.category === 'ai' ? 'AI/ML' : (project.category === 'web' ? 'Web Dev' : 'Data Analysis')}
              </div>
              <h1 className="pd-title">{project.title}</h1>
              <div className="pd-tech">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-badge">#{tech}</span>
                ))}
              </div>
              
              <div className="pd-actions">
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="pd-btn pd-btn-primary">
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a href={project.codeLink} target="_blank" rel="noreferrer" className="pd-btn pd-btn-secondary">
                  <i className="fab fa-github"></i> View Source Code
                </a>
                {project.reportLink && (
                  <a href={project.reportLink} target="_blank" rel="noreferrer" className="pd-btn pd-btn-secondary">
                    <i className="fas fa-file-alt"></i> View Report
                  </a>
                )}
              </div>
            </motion.div>

            {/* Gallery Section */}
            <motion.div 
              className="pd-gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {project.images && project.images.length > 0 ? (
                project.images.map((img, idx) => (
                  <img key={idx} src={`/assets/img/${img}`} alt={`${project.title} Gallery ${idx}`} />
                ))
              ) : (
                <img src={`/assets/img/${project.thumbnail}`} alt={project.title} />
              )}
            </motion.div>

            {/* Problem & Solution Cards */}
            <div className="pd-content-grid">
              <motion.div 
                className="pd-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
              >
                <h3><i className="fas fa-exclamation-triangle"></i> The Problem</h3>
                <p>{project.problem}</p>
              </motion.div>
              <motion.div 
                className="pd-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
              >
                <h3><i className="fas fa-lightbulb"></i> The Solution</h3>
                <p>{project.solution}</p>
              </motion.div>
            </div>

            {/* Case Study Section */}
            {project.caseStudy && (
              <motion.div 
                className="pd-case-study"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
              >
                <h3>Case Study & Approach</h3>
                <p>{project.caseStudy}</p>
              </motion.div>
            )}

            {/* Challenges Section */}
            {project.challenges && project.challenges.length > 0 && (
              <motion.div 
                className="pd-challenges"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
              >
                <h3><i className="fas fa-mountain"></i> Challenges Overcome</h3>
                <ul className="challenges-list">
                  {project.challenges.map((c, idx) => (
                    <li key={idx}><i className="fas fa-check-circle"></i> {c}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Result Section */}
            <motion.div 
              className="pd-result-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <h3>Final Result & Impact</h3>
              <p>{project.result1}</p>
            </motion.div>

            <div className="pd-back">
              <Link to="/#projects"><i className="fas fa-arrow-left"></i> Back to all projects</Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
