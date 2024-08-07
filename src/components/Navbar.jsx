import React, { useContext } from 'react'
import logo from '../assets/images/logo.png'
import '../assets/css/home.css'
import { BiToggleLeft, BiToggleRight } from 'react-icons/bi'
import { AiOutlineLogout } from 'react-icons/ai'
import { FaRegUserCircle, FaWallet } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Navbar = () => {
  const { lan, updateLanguage, auth } = useContext(AuthContext);

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
          <small>မြန်မာ</small> {lan === "en" ? <BiToggleRight size={34} onClick={() => updateLanguage("mm")} /> : <BiToggleLeft size={34} onClick={() => updateLanguage("en")} />} <small>EN</small>
        </div>
        {!auth ? <Link className='btn btn-outline-light' to={'/login'}>{lan === "en" ? "Login" : "အကောင့်ဝင်ရန်"}</Link> : <AiOutlineLogout size={24} />}
      </div>

    </div>
    {auth && (
      <div className='d-flex align-items-center justify-content-between'>
          <Link to={'/profile'} className='d-flex align-items-center gap-2'>
            <FaRegUserCircle size={22} />
            <small>SMP-111111</small>
          </Link>
          <div className='d-flex align-items-center gap-2'>
            <FaWallet size={22} />
            <small>10000Ks</small>
          </div>
      </div>
    )}

    </div>
  )
}

export default Navbar
