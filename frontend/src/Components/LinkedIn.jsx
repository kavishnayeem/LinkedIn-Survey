import React from 'react';
import './LinkedIn.css';
import About from './linkedInComponent/About.jsx';
import Banner from "./linkedInComponent/Banner.jsx";
import Experience from './linkedInComponent/Experience.jsx';
import Education from './linkedInComponent/Education.jsx';
import Skills from './linkedInComponent/Skills.jsx';
import Certifications from './linkedInComponent/Certifications.jsx';
import Volunteer from './linkedInComponent/Volunteer.jsx';


const LinkedInProfile = ({ profileData }) => {

  return (
    <div className="container">
      <Banner  profileData={profileData} />
      
      <div className="section-break" />
   
      {profileData.about && (
        <About  profileData={profileData}/>
      )}
      
      <div className="section-break" />

      {/* Experience Section */}
      {profileData.experience && profileData.experience.length > 0 && (
        <Experience  profileData={profileData}/>
      )}
      
      <div className="section-break" />

      {/* Education Section */}
      {profileData.education && profileData.education.length > 0 && (
          <Education profileData={profileData}/>
      )}
      <div className="section-break" />

      {/* Skills Section */}
      {profileData.skills && profileData.skills.length > 0 && (
        <Skills profileData={profileData}/>
      )}
      
      <div className="section-break" />

      {/* Certifications Section */}
      {profileData.certifications && profileData.certifications.length > 0 && (
        <Certifications profileData={profileData}/>
      )}
      <div className="section-break" />

      {/* Volunteering Section */}
      {profileData.volunteering && profileData.volunteering.length > 0 && (
        <Volunteer profileData={profileData}/>
      )}
    </div>
  );
};

export default LinkedInProfile;