import React from 'react';
import '../LinkedIn.css';

const Experience = ({ profileData }) => {
    const defaultImage = 'https://i.ibb.co/FkqsnrLC/Logo.png';
    return(
        <div className='card'>
        <div className="section">
          <h2 className="section-title">Experience</h2>
          {profileData.experience.map((exp, index) => (
            <div key={index} className="experience-item" style={index < profileData.experience.length - 1 ? { borderBottom: '1px solid rgba(0, 0, 0, 0.1)' } : {}}>
              <div className="company-logo-container">
                <img 
                  src={exp.companyLogo || defaultImage} 
                  alt="Company logo" 
                  className="company-logo" 
                />
              </div>
              <div className="experience-details">
                <h3 className="position">{exp.title}</h3>
                <p className="company">{exp.company}</p>
                <p className="duration">{exp.duration}</p>
                <ul className="experience-bullets">
                  {exp.bullets && exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="bullet-point">{bullet}</li>
                  ))}
                </ul>
              </div>

            </div>
            
          ))}
                       

        </div>
        </div>
        );
    };
export default Experience;
