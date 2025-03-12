import React from 'react';
import '../LinkedIn.css';

const Education = ({ profileData }) => {
  const defaultImage = 'https://i.ibb.co/FkqsnrLC/Logo.png';

  return (
    <div className='card'>
              <div className="section">
          <h2 className="section-title">Education</h2>
          {profileData.education.map((edu, index) => (
            <div key={index} className="education-item" style={index < profileData.education.length - 1 ? { borderBottom: '1px solid rgba(0, 0, 0, 0.1)' } : {}}>
              <div className="school-logo-container">
                <img 
                  src={edu.schoolLogo || defaultImage} 
                  alt="School logo" 
                  className="school-logo" 
                />
              </div>
              <div className="education-details">
                <h3 className="institution" style={{ marginTop: 0, marginBottom: 0 }}>{edu.school}</h3>
                <p className="degree" style={{ marginTop: 0, marginBottom: 0 }}>{edu.degree}</p>
                <p className="education-duration" style={{ marginTop: 0, marginBottom: 0 }}>{edu.duration}</p>
                {edu.courses && (
                  <div className="courses">
                    <strong>Relevant Courses:</strong> {edu.courses.join(', ')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Education;
