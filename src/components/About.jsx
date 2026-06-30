import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function AIMindSVG() {
  return (
    <svg className="neural-svg-container" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(145, 36, 255, 0.35)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
        </radialGradient>
      </defs>
      
      {/* Background glow */}
      <circle cx="100" cy="95" r="75" fill="url(#glow-grad)" />
      
      {/* Connection Paths (Dashed Flowing Lines) */}
      <g stroke="rgba(145, 36, 255, 0.35)" strokeWidth="1.5" fill="none">
        <path d="M100 40 L60 90" className="flow-line" />
        <path d="M100 40 L140 90" className="flow-line" />
        <path d="M60 90 L100 150" className="flow-line" />
        <path d="M140 90 L100 150" className="flow-line" />
        <path d="M60 90 L140 90" className="flow-line" />
        <path d="M100 40 L100 150" className="flow-line" strokeDasharray="4 4" />
      </g>
      
      {/* Central Node (AI Core) */}
      <g>
        <circle cx="100" cy="95" r="15" fill="rgba(145, 36, 255, 0.15)" stroke="#9124ff" strokeWidth="1" />
        <circle cx="100" cy="95" r="5" fill="#fff" className="node-pulse" />
        <circle cx="100" cy="95" r="3" fill="#9124ff" />
      </g>
      
      {/* Node 1: DATA (Top) */}
      <g>
        <circle cx="100" cy="40" r="5.5" fill="#9124ff" stroke="#fff" strokeWidth="1.5" className="node-circle" />
        <text x="100" y="24" textAnchor="middle" fontSize="9" fill="#d1a3ff" fontFamily="'Orbitron', sans-serif" fontWeight="700" letterSpacing="0.5px">DATA</text>
      </g>

      {/* Node 2: ML (Left) */}
      <g>
        <circle cx="60" cy="90" r="5.5" fill="#9124ff" stroke="#fff" strokeWidth="1.5" className="node-circle" />
        <text x="35" y="93" textAnchor="middle" fontSize="9" fill="#d1a3ff" fontFamily="'Orbitron', sans-serif" fontWeight="700" letterSpacing="0.5px">ML</text>
      </g>

      {/* Node 3: DEV (Right) */}
      <g>
        <circle cx="140" cy="90" r="5.5" fill="#9124ff" stroke="#fff" strokeWidth="1.5" className="node-circle" />
        <text x="165" y="93" textAnchor="middle" fontSize="9" fill="#d1a3ff" fontFamily="'Orbitron', sans-serif" fontWeight="700" letterSpacing="0.5px">DEV</text>
      </g>

      {/* Node 4: MATH (Bottom) */}
      <g>
        <circle cx="100" cy="150" r="5.5" fill="#9124ff" stroke="#fff" strokeWidth="1.5" className="node-circle" />
        <text x="100" y="167" textAnchor="middle" fontSize="9" fill="#d1a3ff" fontFamily="'Orbitron', sans-serif" fontWeight="700" letterSpacing="0.5px">MATH</text>
      </g>
    </svg>
  );
}

function MetricRing({ target, label, max, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    const isFloat = target % 1 !== 0;
    const controls = animate(0, target, {
      duration: 1.5,
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
  }, [isInView, target]);

  // Radius = 40, Circumference = 2 * PI * r = 251.2
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.min(target / max, 1);
  const strokeDashoffset = isInView ? circumference - (ratio * circumference) : circumference;

  return (
    <div className="metric-ring-container" ref={ref}>
      <svg className="metric-svg">
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9124ff" />
            <stop offset="100%" stopColor="#d1a3ff" />
          </linearGradient>
        </defs>
        <circle
          className="metric-ring-bg"
          cx="50"
          cy="50"
          r={radius}
        />
        <motion.circle
          className="metric-ring-fill"
          cx="50"
          cy="50"
          r={radius}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="metric-ring-content">
        <span className="metric-ring-number">
          {count}{suffix}
        </span>
        <span className="metric-ring-label">{label}</span>
      </div>
    </div>
  );
}

export default function About() {
  const [skills, setSkills] = useState([]);
  const [tools, setTools] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [loadingTools, setLoadingTools] = useState(true);

  useEffect(() => {
    fetch('/assets/data/skills.json')
      .then(res => res.json())
      .then(data => {
        setSkills(data);
        setLoadingSkills(false);
      })
      .catch(err => {
        console.error("Failed to load skills:", err);
        setLoadingSkills(false);
      });

    fetch('/assets/data/tools.json')
      .then(res => res.json())
      .then(data => {
        setTools(data);
        setLoadingTools(false);
      })
      .catch(err => {
        console.error("Failed to load tools:", err);
        setLoadingTools(false);
      });
  }, []);

  const getToolIcon = (tool) => {
    const styleObj = tool.style ? JSON.parse(convertStyleStringToObj(tool.style)) : {};
    if (tool.type === 'iconify') {
      return <iconify-icon icon={tool.icon} style={styleObj}></iconify-icon>;
    } else {
      return <i className={tool.icon} style={styleObj}></i>;
    }
  };

  const convertStyleStringToObj = (str) => {
    if (!str) return '{}';
    const obj = {};
    str.split(';').forEach(rule => {
      const parts = rule.split(':');
      if (parts[0] && parts[1]) {
        const key = parts[0].trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        obj[key] = parts[1].trim();
      }
    });
    return JSON.stringify(obj);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="about" id="about">
      <div className="section-tittle">
        <h1>About Me</h1>
        <div className="tittle-under"></div>
      </div>
      
      <div className="bento-container">
        {/* Card 1: Intro (Dual Column Bio + SVG Visual) */}
        <motion.div 
          className="bento-card intro-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={cardVariants}
        >
          <div className="intro-bio">
            <div className="intro-header">
              <i className="fas fa-user-astronaut"></i>
              <h2>Who I Am</h2>
            </div>
            <p className="intro-text">
              I am <strong>Ravi Kumar Vishwakarma</strong>, a B.Tech Computer Science & Engineering specialist with a minor in Mathematics. My expertise lies at the intersection of Data Analytics, Machine Learning, and Full-Stack Development.<br/><br/>
              With a proven track record of engineering data pipelines for over 50,000+ records and achieving 99% data integrity, I don't just process data—I extract stories that drive business growth. I developed predictive dashboards that improved decision-making speed by 40% and identified at-risk trends with 85% accuracy.<br/><br/>
              I thrive on solving complex algorithmic challenges (50+ LeetCode problems solved) and building scalable AI solutions. Whether it’s forecasting e-commerce sales with 92% accuracy or architecting full-stack platforms for 1,000+ users, I bridge the gap between technical complexity and user-centric design.
            </p>
          </div>
          <div className="intro-visual">
            <AIMindSVG />
          </div>
        </motion.div>

        {/* Card 2: Circular Progress Achievement Ring Showcase */}
        <motion.div 
          className="bento-card metrics-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={cardVariants}
        >
          <MetricRing target={1.5} label="Experience" max={2.0} suffix="+" />
          <MetricRing target={124} label="LeetCode" max={200} suffix="+" />
          <MetricRing target={63} label="Projects" max={80} suffix="+" />
        </motion.div>

        {/* Card 3: Skills */}
        <motion.div 
          className="bento-card skills-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={cardVariants}
        >
          <h3 className="bento-title"><i className="fas fa-code"></i> Core Technologies</h3>
          <div id="skills-container" className="skills-icons">
            {loadingSkills ? (
              <div className="loader-container">
                <div className="spinner"></div>
              </div>
            ) : (
              skills.map((skill, index) => (
                <div key={index} className="skill-item" title={skill.name}>
                  <i className={skill.icon}></i>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Card 4: Workflow Tools with Spinning Cog SVG */}
        <motion.div 
          className="bento-card tools-card marquee-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={cardVariants}
        >
          <div className="workflow-cog-container">
            <svg className="workflow-cog" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <h3 className="bento-title" style={{ marginBottom: 0 }}>Workflow Tools</h3>
          </div>
          <div className="marquee">
            {loadingTools ? (
              <div className="spinner-small"></div>
            ) : (
              <div className="marquee-content" id="marqueeContent">
                {tools.map((tool, index) => (
                  <div key={`t1-${index}`} className="marquee-item">
                    {getToolIcon(tool)} {tool.name}
                  </div>
                ))}
                {tools.map((tool, index) => (
                  <div key={`t2-${index}`} className="marquee-item">
                    {getToolIcon(tool)} {tool.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
