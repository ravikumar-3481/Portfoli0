import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function Counter({ target, duration = 1.5, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const isFloat = target % 1 !== 0;
    const controls = animate(0, target, {
      duration: duration,
      ease: "easeOut",
      onUpdate: (value) => {
        if (isFloat) {
          setCount(parseFloat(value.toFixed(1)));
        } else {
          setCount(Math.floor(value));
        }
      }
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const scrollRef = useRef(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  // Marquee list contents
  const marqueeItems = [
    "Machine Learning", "User Research", "Data Pipelines", 
    "Full-Stack Development", "Data Analytics", "Design System", 
    "AI Models", "Branding", "Deployment", "Agentic AI"
  ];

  // Repeat twice for seamless infinite scrolling loop
  const doubleMarqueeItems = [...marqueeItems, ...marqueeItems];

  return (
    <section className="about" id="about" ref={scrollRef}>
      {/* 1. Marquee Divider */}
      <div className="about-marquee">
        <div className="about-marquee-content">
          {doubleMarqueeItems.map((item, idx) => (
            <div key={idx} className="about-marquee-item">
              {item} <span className="accent-star">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-tittle reveal active" style={{ marginBottom: '5rem' }}>
            <h1>About Me</h1>
            <div className="tittle-under"></div>
      </div>
      {/* 2. Main About Details */}
      <div className="about-grid-new">
        {/* Left Column: Heading and Location */}
        <motion.div 
          className="about-left-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={textVariants}
        >
          <h2 className="about-headline-new">
            Designing with <span className="italic-gradient">intention</span>, shipping with <span className="italic-gradient">care</span>.
          </h2>
          <div className="about-location-badge">
            <i className="fas fa-map-marker-alt" style={{ color: '#9124ff' }}></i>
            <span>Based in Satna · Working worldwide</span>
          </div>
        </motion.div>

        {/* Right Column: Paragraph Bio & Stats Grid */}
        <motion.div 
          className="about-right-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={rightVariants}
        >
          <p className="about-bio-text">
            I am a B.Tech CSE student specializing in AI & Data Science. I am obsessed with building scalable software systems and analyzing complex datasets to solve real-world problems. Whether it's training machine learning models or designing full-stack interfaces, I focus on the small decisions that turn tangled logic into experiences that feel inevitable.
          </p>
          <p className="about-bio-text">
            Over the past few years, I've developed predictive analytics dashboards improving decision timelines by 40% and engineered data pipelines supporting 50,000+ records. I strive to build applications that are clean, performant, and helpful.
          </p>

          {/* Stats Metrics Grid */}
          <div className="about-stats-grid">
            <div className="about-stat-box">
              <div className="about-stat-number">
                <Counter target={1.5} suffix="+" />
              </div>
              <div className="about-stat-label">Years of Experience</div>
            </div>
            <div className="about-stat-box">
              <div className="about-stat-number">
                <Counter target={63} suffix="+" />
              </div>
              <div className="about-stat-label">Projects Completed</div>
            </div>
            <div className="about-stat-box">
              <div className="about-stat-number">
                <Counter target={124} suffix="+" />
              </div>
              <div className="about-stat-label">LeetCode Solved</div>
            </div>
            <div className="about-stat-box">
              <div className="about-stat-number">
                <Counter target={50} suffix="K+" />
              </div>
              <div className="about-stat-label">Data Records Managed</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. "How I Work" Step Cards Section */}
      <div className="work-section">
        <div className="work-header">
          <span className="work-tag">Workflow</span>
          <h2 className="work-title-new">
            A simple, three-step <span className="work-title-new span.italic-accent">rhythm</span>.
          </h2>
          <p className="work-description-new">
            No mystery, no jargon. Each project follows the same calm cadence so we both know exactly what's next.
          </p>
        </div>

        <div className="work-cards-grid">
          {/* Step 1 */}
          <motion.div 
            className="work-card-new"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardVariants}
          >
            <div className="work-card-bg-number">01</div>
            <div className="work-card-arrow">↗</div>
            <div className="work-card-content">
              <h3 className="work-card-title">Listen & Map</h3>
              <p className="work-card-subtitle">Deep interviews, requirement gathering, mapping current-state logic.</p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            className="work-card-new"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardVariants}
          >
            <div className="work-card-bg-number">02</div>
            <div className="work-card-arrow">↗</div>
            <div className="work-card-content">
              <h3 className="work-card-title">Sketch & Prototype</h3>
              <p className="work-card-subtitle">Building analytical models, database structuring, rapid feedback loops.</p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            className="work-card-new"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardVariants}
          >
            <div className="work-card-bg-number">03</div>
            <div className="work-card-arrow">↗</div>
            <div className="work-card-content">
              <h3 className="work-card-title">Polish & Ship</h3>
              <p className="work-card-subtitle">Query optimization, final testing, refactoring, code handoff.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
