import React, { useContext, useEffect, useState } from 'react'
import '../assets/css/form.css'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../hooks/baseURL';
import { Spinner } from 'react-bootstrap';

const ChangePasswordPage = () => {
  const { auth, lan } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate('/login')
    }
  }, [auth, navigate]);

  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState('');

  const changePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const inputData = {
      current_password: currentPassword,
      password: password,
      password_confirmation: confirmPassword
    }
    try {
        const response = await fetch(BASE_URL + '/changePassword', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(inputData)
        });

        if (!response.ok) {
            setLoading(false)
        let errorData = await response.json().catch(() => ({}));
    
        if (response.status === 422) {
            setErrMsg("");
            setError(errorData.errors || "Unknown error");
            
        } else if (response.status === 401) {
            setError("");
            setErrMsg(errorData.message || "Unauthorized");
        } else {
            throw new Error('Change Password Failed');
        }
    
        throw new Error('Change Password Failed');
        }

        const data = await response.json();
        setCurrentPassword('');
        setPassword('');
        setConfirmPassword('');
        setLoading(false);
        setSuccess(data?.message);

    } catch (error) {
        // console.error('Error during fetch:', error);
        setLoading(false);
    }
  }

  return (
    <div className='px-2 px-sm-3 pt-3 pb-5 my-5' >
        <div className="customForm  py-3 px-2 px-sm-3 rounded-3 border border-white">
            <h4 className="text-center mb-3">{lan === "en" ? "Change Password" : "စကားဝှက်ပြောင်းရန်"}</h4>
            {success &&  <p className="text-success">{success}</p>}
           
            <form onSubmit={changePassword}>
                <div className="mb-3">
                  <p className='mb-2'>{lan === "en" ? "Old Password" : "လျို့ဝှက်နံပါတ် အဟောင်းထည့်ပါ။"}</p>
                  <input 
                    type='password' 
                    className="rounded-3 form-control" 
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                  />
                  {error.current_password && <span className='text-danger mt-1 d-block'>{error.current_password}</span>}
                  {errMsg && <span className='text-danger mt-1 d-block'>{errMsg}</span>}
                </div>
                <div className="mb-3">
                  <p className='mb-2'>{lan === "en" ? "New Password" : "လျို့ဝှက်နံပါတ် အသစ်ထည့်ပါ။"}</p>
                  <input 
                  type='password' 
                  className="rounded-3 form-control" 
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  />
                  {error.password && <span className='text-danger mt-1 d-block'>{error.password}</span>}
                </div>
                <div className="mb-3">
                  <p className='mb-2'>{lan === "en" ? "Confirm Password" : "လျို့ဝှက်နံပါတ် အသစ်ထပ်မံထည့်ပါ။"}</p>
                  <input 
                  type='password' 
                  className="rounded-3 form-control" 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  />
                  {error.password_confirmation && <span className='text-danger mt-2 d-block'>{error.password_confirmation}</span>}
                </div>
                <button className="w-full text-white border border-white rounded-3 text-center py-2 px-4 mt-3">
                  {loading && <Spinner size='sm' className='me-2' />}
                  {lan === "en" ? "Change" : "ပြောင်းသည်"}
                </button>
              </form>
        </div>
    </div>
  )
}

export default ChangePasswordPage
