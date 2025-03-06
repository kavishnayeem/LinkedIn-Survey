import React from 'react';
import '../LinkedIn.css';
const Banner = ({ profileData }) => {
    const defaultImage = 'https://www.pirbright.ac.uk/themes/custom/pirbright/images/default-image.svg';
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
      </div>
    );
};
export default Banner