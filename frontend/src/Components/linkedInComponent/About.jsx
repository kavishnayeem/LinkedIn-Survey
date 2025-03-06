import React from 'react';
import '../LinkedIn.css';
const About = ({ profileData }) => {
return(
    <div className='card'>
    <div className="section">
          <h2 className="section-title">About</h2>
          {profileData.about.split('\n').map((paragraph, index) => (
            <p key={index} className="about-text">{paragraph}</p>
          ))}
    </div>
    </div>
);
};
export default About
