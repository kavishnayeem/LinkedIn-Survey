import React from 'react';
import '../LinkedIn.css';

const Certifications = ({ profileData }) => {
    const defaultImage = 'https://www.pirbright.ac.uk/themes/custom/pirbright/images/default-image.svg';

    return (
        <div className='card'>
            <div className="section">
          <h2 className="section-title">Licenses & Certifications</h2>
          {profileData.certifications.map((cert, index) => (
            <div key={index} className="certification-item"  style={index < profileData.certifications.length - 1 ? { borderBottom: '1px solid rgba(0, 0, 0, 0.1)' } : {}}>
              <div className="certification-logo-container">
                <img 
                  src={cert.issuerLogo || defaultImage} 
                  alt="Certification logo" 
                  className="certification-logo" 
                />
              </div>
              <div className="certification-details">
                <h3 className="certification-title" style={{ marginTop: 0, marginBottom: '1%' }}>{cert.name}</h3>
                <p className="certification-info" style={{ marginTop: 0, marginBottom: '1%' }}>{cert.issuer} · {cert.issueDate}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
    );
};

export default Certifications;
