import React from 'react';
import './LinkedIn.css';

const LinkedInProfile = ({ profileData }) => {
  const defaultImage = 'https://www.pirbright.ac.uk/themes/custom/pirbright/images/default-image.svg';

  return (
    <div className="container">
      <div className="banner">
        <img 
          src={profileData.backgroundPic || defaultImage} 
          alt="Background" 
          className="banner-image"
        />
        
        <img 
          src={profileData.profilePic || defaultImage} 
          alt="Profile" 
          className="avatar"
        />
        {profileData.opentowork && (
          <img 
            src="https://media.licdn.com/dms/image/D5612AQEGgFogiOMtTw/article-cover_image-shrink_720_1280/0/1687102860396?e=2147483647&v=beta&t=uWIcQ2E30bBn8xoI4zqEy7F0Ha6uuhuzMoErkI8JuBw" // Replace with the actual URL of the open to work image
            alt="Open to Work" 
            className="open-to-work-image"
          />
        )}
      </div>

      <div className="profile-info">
        <h1 className="name">{profileData.name}</h1>
        <p className="headline">{profileData.headline}</p>
        <p className="location">{profileData.location}</p>
        <p className="connections">{profileData.connections} connections</p>
        
        <div className="button-container">
          <button className="primary-button">Connect</button>
          <button className="secondary-button">Message</button>
        </div>
      </div>
      <div className="section-break" />

      {profileData.featured && profileData.featured.length > 0 && (
        <div className="section">
          <h2 className="section-title">Featured</h2>
          {profileData.featured.map((item, index) => (
            <div key={index} className="featured-item">{item}</div>
          ))}
        </div>
      )}
     
      {profileData.about && (
        <div className="section">
          <h2 className="section-title">About</h2>
          <p className="about-text">{profileData.about}</p>
        </div>
      )}
      <div className="section-break" />

      {/* Experience Section */}
      {profileData.experience && profileData.experience.length > 0 && (
        <div className="section">
          <h2 className="section-title">Experience</h2>
          {profileData.experience.map((exp, index) => (
            <div key={index} className="experience-item">
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
      )}
      <div className="section-break" />

      {/* Education Section */}
      {profileData.education && profileData.education.length > 0 && (
        <div className="section">
          <h2 className="section-title">Education</h2>
          {profileData.education.map((edu, index) => (
            <div key={index} className="education-item">
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
      )}
      <div className="section-break" />

      {/* Skills Section */}
      {profileData.skills && profileData.skills.length > 0 && (
        <div className="section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-container">
            {profileData.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      )}
      <div className="section-break" />

      {/* Certifications Section */}
      {profileData.certifications && profileData.certifications.length > 0 && (
        <div className="section">
          <h2 className="section-title">Licenses & Certifications</h2>
          {profileData.certifications.map((cert, index) => (
            <div key={index} className="certification-item">
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
      )}
      <div className="section-break" />

      {/* Volunteering Section */}
      {profileData.volunteering && profileData.volunteering.length > 0 && (
        <div className="section">
          <h2 className="section-title">Volunteering</h2>
          {profileData.volunteering.map((vol, index) => (
            <div key={index} className="experience-item">
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
      )}
    </div>
  );
};

export default LinkedInProfile;