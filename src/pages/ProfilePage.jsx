import React from 'react'
import user from '../assets/images/user.png'
import { Button } from 'react-bootstrap'
const ProfilePage = () => {
  return (
    <div className=' px-2 px-4 px-lg-5 pb-5 mb-5'>
       <h3 className="fw-semibold mb-4 text-center">Profile</h3>
       <div className="customForm">
       <div className="text-center">
        <img className='user my-2 rounded-5' src={user} />
        </div>
        <div className="mb-3">
            <p className="mb-1">Username</p>
            <input type="text" value={'User1323'} className="form-control" />
        </div>
        <div className="mb-3">
            <p className="mb-1">Phone Number</p>
            <input type="text" value={'09123456'} className="form-control" />
        </div>
        <Button className='w-full' variant="outline-primary">Update Profile</Button>
       </div>
       </div>
    )
}

export default ProfilePage
