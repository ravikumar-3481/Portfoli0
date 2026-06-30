import { useState, useEffect } from 'react';

const SHEET_ID = '1Y3ZMgMpme1xolYpka_2EwayrpUkpr7Qic2AzfspGwTA';
const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(URL)
      .then(res => res.text())
      .then(text => {
        // Extract JSON from Google Sheets JSONP wrapper (removing the prefix / suffix)
        const startIdx = text.indexOf('{');
        const endIdx = text.lastIndexOf('}') + 1;
        const jsonStr = text.substring(startIdx, endIdx);
        const jsonData = JSON.parse(jsonStr);
        const rows = jsonData.table.rows;

        // Extract and filter testimonial details
        const nameSeen = new Set();
        const parsed = [];
        
        // Reverse rows to evaluate newest submissions first
        const reversedRows = [...rows].reverse();
        
        for (const row of reversedRows) {
          const name = row.c[1] ? row.c[1].v.toString().trim() : '';
          const role = row.c[2] ? row.c[2].v.toString().trim() : 'Professional';
          const institute = row.c[3] ? row.c[3].v.toString().trim() : '';
          const rating = row.c[4] ? parseInt(row.c[4].v) : 5;
          const feedback = row.c[5] ? row.c[5].v.toString().trim() : '';

          if (!name || !feedback) continue;

          // Filter out short spam/placeholder entries and known duplicate typo submissions
          const lowerFeedback = feedback.toLowerCase();
          if (feedback.length < 12 || lowerFeedback === 'gurukul senior secondary' || lowerFeedback === 'gurukul senior secondary school') {
            continue;
          }

          // Deduplicate by name
          if (!nameSeen.has(name)) {
            nameSeen.add(name);
            parsed.push({
              name,
              role,
              institute,
              rating,
              feedback
            });
          }

          if (parsed.length >= 4) break;
        }

        setTestimonials(parsed);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading sheet testimonials:", err);
        setLoading(false);
      });
  }, []);

  const toggleTestimonial = (index) => {
    setExpanded(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section id="testimonials">
      <div className="section-tittle reveal active">
        <h1>What People Say</h1>
        <div className="tittle-under"></div>
        <p className="section-description">Feedback from collaborators and clients regarding my work in AI, Data Science, and Development.</p>
      </div>

      <div id="testimonial-grid" className="test-grid reveal active">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          testimonials.map((t, index) => {
            const isLong = t.feedback.length > 120;
            const isExpanded = !!expanded[index];
            const displayFeedback = isExpanded || !isLong 
              ? t.feedback 
              : `${t.feedback.substring(0, 120)}...`;

            return (
              <div key={index} className="t-card reveal active">
                <i className="fas fa-quote-right quote-mark"></i>
                <div className="content-top">
                  <div className="rating-stars">
                    {Array(5).fill(0).map((_, i) => (
                      <i key={i} className={`${i < t.rating ? 'fas' : 'far'} fa-star`}></i>
                    ))}
                  </div>
                  <p className="feedback-text" style={{ 
                    marginBottom: 0, 
                    whiteSpace: 'pre-line'
                  }}>
                    "{displayFeedback}"
                  </p>
                  {isLong && (
                    <span 
                      className="read-more-btn" 
                      style={{ 
                        color: '#9124ff', 
                        cursor: 'pointer', 
                        fontSize: '0.85rem', 
                        fontWeight: 600, 
                        display: 'inline-block', 
                        marginTop: '8px' 
                      }} 
                      onClick={() => toggleTestimonial(index)}
                    >
                      {isExpanded ? 'Read Less ' : 'Read More '}
                      <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </span>
                  )}
                </div>
                <div className="meta-container">
                  <div className="meta-info">
                    <div className="meta-name">{t.name}</div>
                    <div className="meta-role">
                      {t.role} {t.institute && <>at <b>{t.institute}</b></>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="test-btn reveal active">
        <button onClick={() => window.open('https://forms.gle/wyR1g39bA79EYu8X8', '_blank')} className="btn1">
          Endorse
        </button>
      </div>
    </section>
  );
}
