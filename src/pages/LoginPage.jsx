import React from 'react'
import '../assets/css/form.css'
import logo from '../assets/images/logo.png';

const LoginPage = () => {
  return (
    <div className='px-2 px-sm-3 pt-3 pb-5 my-5' >
        <div className="customForm  py-3 px-2 px-sm-3 rounded-3 border border-white">
            <div className="text-center">
            <img src={logo} className='logo' />
            </div>
            <h4 className="text-center my-4">
                Welcome To Spiderman - Slot 
            </h4>
            <div className="mb-3">
                <p className='mb-1'>Name</p>
                <input type='text' placeholder='Enter Name' className="rounded-3 form-control" />
              </div>
              <div className="mb-3">
                <p className='mb-1'> Password</p>
                <input type='password' placeholder='Enter Password' className="rounded-3 form-control" />
              </div>
              
              <button className="mt-4 w-full text-white border border-white rounded-3 text-center py-2 px-4">
                Login
              </button>
        </div>
    </div>
  )
}

export default LoginPage
