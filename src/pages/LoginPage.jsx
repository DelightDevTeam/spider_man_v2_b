import React, { useCallback, useEffect, useState } from 'react'
import '../assets/css/form.css'
import logo from '../assets/images/logo.png';
import BASE_URL from '../hooks/baseURL';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import useLogin from '../hooks/useLogin';

const LoginPage = () => {
 const [form,setForm]=useState({
  user_name:'',password:''
 })
 const handleInput=(e)=>{
  setForm({...form,[e.target.id]:e.target.value})
 } 
  
   const navigate = useNavigate();

  const { errMsg,error,loading,login }= useLogin();
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const url = `${BASE_URL}/login`;
    await login(url,form);
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
                id="user_name"
                value={form.user_name}
                onChange={handleInput}
                
                />
                {error?.user_name && <small className='text-danger'>{error.user_name}</small>}
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
              
              <button type='submit' className="mt-4 w-full text-white border border-white rounded-3 text-center py-2 px-4">
                {loading && <Spinner size='sm' className='me-2' />}
                Login
              </button>
            </form>
            <div className="text-center mt-4">
            Don't have an account yet? <Link className='border-bottom' to={'/register'}>Register Now</Link>
            </div>
        </div>
    </div>
  )
}

export default LoginPage
