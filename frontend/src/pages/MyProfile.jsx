import React, { useState } from 'react'
import {assets} from '../assets/assets'

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name: "Yukti sahu",
    image: assets.profile_pic,
    email: 'yuktisahu@gmail.com',
    phone:'+1 123 456 7890'
  })
  return (
    <div>
      
    </div>
  )
}

export default MyProfile
