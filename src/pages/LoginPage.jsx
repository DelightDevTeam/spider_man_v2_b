import React, { useEffect, useState } from 'react'
import '../assets/css/form.css'
import logo from '../assets/images/logo.png';
import BASE_URL from '../hooks/baseURL';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const auth = localStorage.getItem('token');
  useEffect(() => {
    if(auth){
      navigate('/');
    }
  }, [auth, navigate]);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    const loginData = {
      "user_name": name,
      "password": password
    }
    fetch(BASE_URL + '/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(async response => {
        if (!response.ok) {
          setLoading(false);
          let errorData;
          try {
            errorData = await response.json();
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
    
          if (response.status === 422) {
            setErrMsg("");
            setError(errorData.errors);
          }else if (response.status === 401) {
            setError("");
            setErrMsg(errorData.message)
          }else{
          }
          throw new Error('Login Failed');
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);
        if (data.data.token) {
          localStorage.setItem('token', data.data.token);
          navigate('/')
          console.log("success");
        } else {
          throw new Error('Token not found in response');
        }
      })
      .catch(error => {
    });
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
            <form onSubmit={login}>
              <div className="mb-3">
                <p className='mb-1'>Name</p>
                <input type='text' 
                placeholder='Enter Name' 
                className="rounded-3 form-control" 
                onChange={e => setName(e.target.value)}
                value={name}
                />
                {error.user_name && <small className='text-danger'>{error.user_name}</small>}
                {errMsg && <small className='text-danger'>{errMsg}</small>}
              </div>
              <div className="mb-3">
                <p className='mb-1'> Password</p>
                <input type='password' 
                placeholder='Enter Password' 
                className="rounded-3 form-control"
                onChange={e => setPassword(e.target.value)}
                value={password}
                />
                {error.password && <small className='text-danger'>{error.password}</small>}
              </div>
              
              <button className="mt-4 w-full text-white border border-white rounded-3 text-center py-2 px-4">
                {loading && <Spinner size='sm' className='me-2' />}
                Login
              </button>
            </form>
        </div>
    </div>
  )
}

export default LoginPage
