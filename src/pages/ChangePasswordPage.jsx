import React from 'react'
import '../assets/css/form.css'

const ChangePasswordPage = () => {
  return (
    <div className='px-2 px-sm-3 pt-3 pb-5 my-5' >
        <div className="customForm  py-3 px-2 px-sm-3 rounded-3 border border-white">
            <h4 className="text-center">Change Password</h4>
            <div className="mb-3">
                <p className='mb-1'>Old Password</p>
                <input type='password' className="rounded-3 form-control" />
              </div>
              <div className="mb-3">
                <p className='mb-1'>New Password</p>
                <input type='password' className="rounded-3 form-control" />
              </div>
              <div className="mb-3">
                <p className='mb-1'>Confirm Password</p>
                <input type='password' className="rounded-3 form-control" />
              </div>
              <button className="w-full text-white border border-white rounded-3 text-center py-2 px-4">
                Submit
              </button>
        </div>
    </div>
  )
}

export default ChangePasswordPage
