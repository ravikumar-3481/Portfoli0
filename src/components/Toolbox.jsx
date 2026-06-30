import { useState, useEffect } from 'react';

export default function Toolbox() {
  const [skills, setSkills] = useState([]);
  const [tools, setTools] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [otherSkills, setOtherSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/assets/data/skills.json').then(res => res.json()),
      fetch('/assets/data/tools.json').then(res => res.json()),
      fetch('/assets/data/soft.json').then(res => res.json()),
      fetch('/assets/data/other.json').then(res => res.json())
    ])
      .then(([skillsData, toolsData, softData, otherData]) => {
        setSkills(skillsData);
        setTools(toolsData);
        setSoftSkills(softData);
        setOtherSkills(otherData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load toolbox data:", err);
        setLoading(false);
      });
  }, []);

  const getToolIcon = (tool) => {
    if (tool.type === 'iconify') {
      return <iconify-icon icon={tool.icon}></iconify-icon>;
    } else {
      return <i className={tool.icon}></i>;
    }
  };

  return (
    <section className="toolbox-premium reveal active" id="toolbox">
      <div className="section-tittle">
        <h1>My Expert Stack</h1>
        <div className="tittle-under"></div>
      </div>

      <div className="toolbox-grid">
        <div className="toolbox-box">
          <h3 className="box-header"><i className="fas fa-code-branch"></i> Hard Skills</h3>
          <div id="skills-grid" className="items-container">
            {loading ? (
              <div className="spinner-small"></div>
            ) : (
              skills.map((s, index) => (
                <div key={index} className="tool-item">
                  <i className={s.icon}></i>
                  <p>{s.name}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="toolbox-box">
          <h3 className="box-header"><i className="fas fa-layer-group"></i> Tools & Tech</h3>
          <div id="tools-grid" className="items-container">
            {loading ? (
              <div className="spinner-small"></div>
            ) : (
              tools.map((t, index) => (
                <div key={index} className="tool-item">
                  {getToolIcon(t)}
                  <p>{t.name}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="toolbox-box">
          <h3 className="box-header"><i className="fas fa-user-tie"></i> Soft Skills</h3>
          <div id="soft-skills-grid" className="items-container soft-list">
            {loading ? (
              <div className="spinner-small"></div>
            ) : (
              softSkills.map((s, index) => (
                <div key={index} className="soft-tag">{s.name}</div>
              ))
            )}
          </div>
        </div>

        <div className="toolbox-box">
          <h3 className="box-header"><i className="fas fa-user-tie"></i> Other Skills</h3>
          <div id="other-skills-grid" className="items-container soft-list">
            {loading ? (
              <div className="spinner-small"></div>
            ) : (
              otherSkills.map((o, index) => (
                <div key={index} className="soft-tag">{o.name}</div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
