import React, { useContext } from 'react'
import { FaGift } from 'react-icons/fa'
import { HiOutlineCash } from 'react-icons/hi'
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import { IoDiamondOutline } from 'react-icons/io5'
import { MdOutlineLockPerson } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { FaHeadphonesSimple } from 'react-icons/fa6'
import { BiWallet } from 'react-icons/bi'

const Footer = () => {
    const {lan} = useContext(AuthContext);
    const menus=[
        {icon:<IoDiamondOutline size={21} />,name:'Home',name_mm:'ပင်မ',link:'/'},
        // {icon:<MdOutlineLockPerson  size={26}/>,name:'Change Password',name_mm:'စကားဝှက်ပြောင်းရန်',link:'/change-password'},
        {icon:<FaGift  size={21}/>,name:'Promotion',name_mm:'ပရိုမိုရှင်း',link:'/promotion'},
        {icon:<BiWallet  size={26}/>,name:'Game Logs',name_mm:'Wallet',link:'/wallet'},
        {icon:<HiOutlineClipboardDocumentList  size={26}/>,name:'Game Logs',name_mm:'ဂိမ်းမှတ်တမ်း',link:'/game-logs'},
        {icon:<HiOutlineCash  size={26} />,name:'Transfer History',name_mm:'ငွေမှတ်တမ်း', link:'/transfer-history'},
        {icon:<FaHeadphonesSimple  size={20} />,name:'Contact',name_mm:'Contact', link:'/contact'},

    ]
  return (
    <div className='footer py-2 px-2 py-sm-2 px-sm-3 d-flex align-items-center justify-content-between gap-2'>
        {menus.map((menu,index)=>{
            return <Link to={menu.link} key={index} className='text-center' >
                {menu.icon}
                <p className="footerText d-block mt-lg-1">{lan === "en" ? menu.name : menu.name_mm}</p>
            </Link>
        })}
    </div>
  )
}

export default Footer
