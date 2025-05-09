import React from 'react';
import '../LinkedIn.css';
const Banner = ({ profileData }) => {
    const defaultImage = 'https://i.ibb.co/gFMxhfY3/Banner.png';
    return(
        <div className='card'>
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
            src="https://i.ibb.co/KpcpmckC/1687102860396-e-2147483647-v-beta-t-u-WIc-Q2-E30b-Bn8xo-I4zq-Ey7-F0-Ha6uuhuz-Mo-Erk-I8-Ju-Bw.png" // Replace with the actual URL of the open to work image
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
      </div>
    );
};
export default Banner
