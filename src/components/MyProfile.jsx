import React from 'react'
import profilePic from '../assets/artpregoner.jpg';

export const MyProfile = () => {
  return (
    <div className="flex justify-center items-center">
        <img className="w-40 md:w-60 lg:w-72 h-auto object-cover rounded-lg" src={profilePic} alt="art javar pregoner" title="Art Javar Pregoner"/>
    </div>
  )
}

export default MyProfile;