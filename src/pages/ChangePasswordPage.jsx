import React, { useContext, useEffect, useState } from 'react'
import '../assets/css/form.css'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../hooks/baseURL';
import { Spinner } from 'react-bootstrap';
import useFormSubmit from '../hooks/useFormSubmit';
 const ChangePasswordPage = () => {
  const [form,setForm] = useState({
    current_password:'',password:'',password_confirmation:''
  })
  const { errMsg,error,inputSubmit,loading } = useFormSubmit()
  const handleInput=(e)=>{
    setForm({...form,[e.target.id]:e.target.value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const url=`${BASE_URL}/change-password`;
    await inputSubmit(url,form,'POST','/','Password Updated successfully!');
    console.log('form',form)
  }

  return (
    <div className='px-2 px-sm-3 pt-3 pb-5 my-5' >
        <div className="customForm  py-3 px-2 px-sm-3 rounded-3 border border-white">
            <h4 className="text-center mb-3">Change Password</h4>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <p className='mb-2'>Old Password</p>
                  <input 
                    type='password' 
                    id='current_password'
                    className="rounded-3 form-control"   
                    value={form.current_password}
                     onChange={handleInput}
                  />
                  {error?.current_password && <span className='text-danger mt-1 d-block'>{error.current_password}</span>}
                  {errMsg && <span className='text-danger mt-1 d-block'>{errMsg}</span>}
                </div>
                <div className="mb-3">
                  <p className='mb-2'>New Password</p>
                  <input 
                  type='password' 
                  className="rounded-3 form-control" 
                  id='password'
                  value={form.password}
                  onChange={handleInput}
                  />
                  {error?.password && <span className='text-danger mt-1 d-block'>{error.password}</span>}
                </div>
                <div className="mb-3">
                  <p className='mb-2'>Confirm Password</p>
                  <input 
                  type='password' 
                  className="rounded-3 form-control" 
                  id='password_confirmation'
                  value={form.password_confirmation}
                  onChange={handleInput}
                  />
                  {error?.password_confirmation && <span className='text-danger mt-2 d-block'>{error.password_confirmation}</span>}
                </div>
                <button type='submit' className="w-full text-white border border-white rounded-3 text-center py-2 px-4 mt-3">
                  {loading && <Spinner size='sm' className='me-2' />}
                  Submit
                </button>
              </form>
        </div>
    </div>
  )
}

export default ChangePasswordPage
