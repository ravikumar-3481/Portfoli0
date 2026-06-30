import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false })); // clear error on change
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {
      name: !formData.name || formData.name.trim() === '',
      email: !formData.email || !emailRegex.test(formData.email),
      subject: !formData.subject || formData.subject === '',
      message: !formData.message || formData.message.trim() === ''
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(val => val === true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);

    try {
      const response = await fetch('https://formspree.io/f/xvgqzalg', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Network error. Please check your connection.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-tittle reveal active">
        <h1>Get In Touch</h1>
        <div className="tittle-under"></div>
        <p className="section-description">Have a project in mind or just want to say hi? Feel free to reach out!</p>
      </div>

      <div className="contact-container reveal active">
        <div className="contact-info">
          <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '10px' }}>Let's Connect</h3>
          <p style={{ color: '#aaa', marginBottom: '30px', fontSize: '1rem', lineHeight: '1.6' }}>
            Feel free to reach out to me via email or connect with me on these platforms!
          </p>
          <div className="social-links-grid">
            <a href="https://github.com/ravikumar-3481" target="_blank" rel="noreferrer" className="social-link-item">
              <i className="fa-brands fa-github"></i><span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/ravi-vishwakarma67" target="_blank" rel="noreferrer" className="social-link-item">
              <i className="fa-brands fa-linkedin"></i><span>LinkedIn</span>
            </a>
            <a href="https://leetcode.com/u/ravivish3481/" target="_blank" rel="noreferrer" className="social-link-item">
              <iconify-icon icon="simple-icons:leetcode"></iconify-icon><span>LeetCode</span>
            </a>
            <a href="https://www.kaggle.com/ravivishwakarma0909" target="_blank" rel="noreferrer" className="social-link-item">
              <iconify-icon icon="simple-icons:kaggle"></iconify-icon><span>Kaggle</span>
            </a>
            <a href="mailto:ravivish968@gmail.com" className="social-link-item">
              <iconify-icon icon="simple-icons:gmail"></iconify-icon><span>Email</span>
            </a>
            <a href="#" className="social-link-item" onClick={(e) => { e.preventDefault(); alert("Discord link coming soon!"); }}>
              <iconify-icon icon="simple-icons:discord"></iconify-icon><span>Discord</span>
            </a>
            <a href="https://topmate.io/ravi_vishwakarma0" target="_blank" rel="noreferrer" className="social-link-item">
              <iconify-icon icon="simple-icons:topmate"></iconify-icon><span>Topmate</span>
            </a>
            <a href="https://x.com/I_am_ravi09" target="_blank" rel="noreferrer" className="social-link-item">
              <iconify-icon icon="simple-icons:x"></iconify-icon><span>X</span>
            </a>
            <a href="https://www.instagram.com/i_am_ravi.07" target="_blank" rel="noreferrer" className="social-link-item">
              <i className="fa-brands fa-instagram"></i><span>Instagram</span>
            </a>
          </div>
        </div>
        
        <div className="contact-card">
          <form id="contact-form" onSubmit={handleSubmit}>
            <div className={`form-group ${errors.name ? 'error' : ''}`}>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder=" " 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
              <label htmlFor="name">Your Name</label>
              <span className="error-message">Please enter your name</span>
            </div>

            <div className={`form-group ${errors.email ? 'error' : ''}`}>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder=" " 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
              <label htmlFor="email">Email Address</label>
              <span className="error-message">Please enter a valid email</span>
            </div>

            <div className={`form-group ${errors.subject ? 'error' : ''}`}>
              <select 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled></option>
                <option value="general Inquiry">General Inquiry</option>
                <option value="work with us">Work With Us</option>
                <option value="for hire me">For Hire me</option>
                <option value="support">Support</option>
                <option value="other">Other</option>
              </select>
              <label htmlFor="subject">Subject</label>
              <span className="error-message">Please select a subject</span>
            </div>

            <div className={`form-group ${errors.message ? 'error' : ''}`}>
              <textarea 
                id="message" 
                name="message" 
                placeholder=" " 
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
              <label htmlFor="message">Your Message</label>
              <span className="error-message">Please enter your message</span>
            </div>

            <button type="submit" className="submit-btn" disabled={isSending}>
              <span>{isSending ? 'Sending...' : 'Send Message'}</span>
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>

          <div className={`success-message ${showSuccess ? 'active' : ''}`} id="successMsg">
            <div className="success-content">
              <div className="success-icon">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </div>
              <h2>Message Sent!</h2>
              <p>I've received your message and will get back to you soon.</p>
              <button className="btn1" onClick={() => setShowSuccess(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
