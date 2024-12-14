import React, { useCallback, useEffect, useState } from 'react'
import '../assets/css/form.css'
import logo from '../assets/images/logo.png';
import BASE_URL from '../hooks/baseURL';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import useLogin from '../hooks/useLogin';
import useRegister from '../hooks/useRegister';

const RegisterPage = () => {
 const [form,setForm]=useState({
  name:'', phone:'',password:'',password_confirmation:'',referral_code:''
 })
 const handleInput=(e)=>{
  setForm({...form,[e.target.id]:e.target.value})
 } 
  
 
  const { errMsg,error,loading,register }= useRegister();
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const url = `${BASE_URL}/register`;
    await register(url,form);
  }

  return (
    <div className='px-2 px-sm-3 pt-3 pb-5 my-5' >
        <div className="customForm  py-3 px-2 px-sm-3 rounded-3 border border-white">
            <div className="text-center">
              <Link to={'/'}>
                <img src={logo} className='logo' />
              </Link>
            </div>
            <h4 className="text-center my-4">
                Welcome To Spiderman - Slot 
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <p className='mb-1'>Username</p>
                <input type='text' 
                placeholder='Enter Name' 
                className="rounded-3 form-control" 
                id="name"
                value={form.name}
                onChange={handleInput}
                
                />
                {error?.name && <small className='text-danger'>{error.name}</small>}
                {/* {errMsg && <small className='text-danger'>{errMsg}</small>} */}
              </div>
              <div className="mb-3">
                <p className='mb-1'>Phone</p>
                <input type='text' 
                placeholder='Enter Phone' 
                className="rounded-3 form-control" 
                id="phone"
                value={form.phone}
                onChange={handleInput}
                
                />
                {error?.phone && <small className='text-danger'>{error.phone}</small>}
                {/* {errMsg && <small className='text-danger'>{errMsg}</small>} */}
              </div>
              <div className="mb-3">
                <p className='mb-1'> Password</p>
                <input type='password' 
                placeholder='Enter Password' 
                className="rounded-3 form-control"
               id='password'
               value={form.password}
               onChange={handleInput}
                />
                {error?.password && <small className='text-danger'>{error.password}</small>}
              </div>
              <div className="mb-3">
                <p className='mb-1'>Confirm Password</p>
                <input type='password' 
                placeholder='Enter Confirm Password' 
                className="rounded-3 form-control"
               id='password_confirmation'
               value={form.password_confirmation}
               onChange={handleInput}
                />
                {error?.password_confirmation && <small className='text-danger'>{error.password_confirmation}</small>}
              </div>
              <div className="mb-3">
                <p className='mb-1'>Referral Code</p>
                <input type='text' 
                placeholder='Enter Referral Code' 
                className="rounded-3 form-control"
               id='referral_code'
               value={form.referral_code}
               onChange={handleInput}
                />
                {error?.referral_code && <small className='text-danger'>{error.referral_code}</small>}
              </div>
              
              <button type='submit' className="mt-4 w-full text-white border border-white rounded-3 text-center py-2 px-4">
                {loading && <Spinner size='sm' className='me-2' />}
                Register
              </button>
            </form>
            <div className="text-center mt-4">
            Already have an account? <Link className='border-bottom' to={'/login'}>Login Here</Link>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage
