import React, { useContext } from 'react'
import logo from '../assets/images/logo.png'
import '../assets/css/home.css'
import { BiToggleLeft, BiToggleRight } from 'react-icons/bi'
import { AiOutlineLogout } from 'react-icons/ai'
import { FaRegUserCircle, FaWallet } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import useLogout from '../hooks/useLogout'
import useLanguage from '../hooks/useLanguage'
import en_data from '../lang/en'
import mm_data from '../lang/mm'

const Navbar = () => {
  const {  auth, user } = useContext(AuthContext);
  const { lang,toggleLang }  = useLanguage();
  const content = lang === 'en' ? en_data.home : mm_data.home;
  const navigate = useNavigate();
  const {loading,logout} = useLogout();  
  const handleLogout=async()=>{
    await logout();
  }

  return (
    <div className=' py-2 px-2 px-sm-4'>
    <div className='d-flex align-items-center justify-content-between'>
      <Link to={'/'}>
      <img src={logo} className='logo' />
      </Link>
      {/* <button className='mainBg customBtn text-white py-2 px-4  rounded-3 text-center '>
        Login
      </button> */}
      <div className="cursor-pointer d-flex align-items-center gap-sm-3">
        <div className='me-3'>
          <small>မြန်မာ</small> {lang === "en" ? <BiToggleRight size={34} onClick={toggleLang} /> : <BiToggleLeft size={34} onClick={toggleLang} />} <small>EN</small>
        </div>
        {!auth ? 
        <Link className='btn btn-outline-light' to={'/login'}>{content.login}</Link> : 
        <AiOutlineLogout className="cursor-pointer" onClick={handleLogout} size={24} />
        }
      </div>
    </div>
    {auth && (
      <div className='d-flex align-items-center justify-content-between'>
          <Link to={'/profile'} className='d-flex align-items-center gap-2'>
            <FaRegUserCircle size={22} />
            <small>{user?.user_name}</small>
          </Link>
          <div className='d-flex align-items-center gap-2'>
            <FaWallet size={22} />
            <small>{Number(user?.balance).toLocaleString('en-US')} {content.kyat}</small>
          </div>
      </div>
    )}

    </div>
  )
}

export default Navbar
