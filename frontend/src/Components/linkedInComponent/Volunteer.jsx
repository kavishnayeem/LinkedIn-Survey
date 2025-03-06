import React from 'react';
import '../LinkedIn.css';

const Volunteer = ({ profileData }) => {
    const defaultImage = 'https://www.pirbright.ac.uk/themes/custom/pirbright/images/default-image.svg';

    return (
        <div className='card'>
            <div className="section">
          <h2 className="section-title">Volunteering</h2>
          {profileData.volunteering.map((vol, index) => (
            <div key={index} className="experience-item" style={index < profileData.volunteering.length - 1 ? { borderBottom: '1px solid rgba(0, 0, 0, 0.1)' } : {}} >
              <div className="company-logo-container">
                <img 
                  src={vol.companyLogo || defaultImage} 
                  alt="Company logo" 
                  className="company-logo" 
                />
              </div>
              <div className="experience-details">
                <h3 className="position">{vol.title}</h3>
                <p className="company">{vol.company}</p>
                <p className="duration">{vol.duration}</p>
                <ul className="experience-bullets">
                  {vol.bullets && vol.bullets.map((bullet, idx) => (
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

export default Volunteer;
