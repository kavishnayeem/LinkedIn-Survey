import React from 'react';
import '../LinkedIn.css';


const skills = ({ profileData }) => {
    return (
        <div className="card">
            <div className="section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-container">
            {profileData.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
        </div>
    );
};

export default skills;
