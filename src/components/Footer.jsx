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
import en_data from '../lang/en'
import mm_data from '../lang/mm'
import useLanguage from '../hooks/useLanguage'

const Footer = () => {
    const { lang }  = useLanguage();
    const content = lang === 'en' ? en_data.footer : mm_data.footer;
    const menus=[
        {icon:<IoDiamondOutline size={21} />,name:content.home,link:'/'},
        // {icon:<MdOutlineLockPerson  size={26}/>,name:'Change Password',name_mm:'စကားဝှက်ပြောင်းရန်',link:'/change-password'},
        {icon:<FaGift  size={21}/>,name:content.promotion,link:'/promotion'},
        {icon:<BiWallet  size={26}/>,name:content.wallet,link:'/wallet'},
        {icon:<HiOutlineClipboardDocumentList  size={26}/>,name: content.game_logs,link:'/game-logs'},
        {icon:<HiOutlineCash  size={26} />,name:content.transfer_logs, link:'/transfer-history'},
        {icon:<FaHeadphonesSimple  size={20} />,name:content.contact, link:'/contact'},

    ]
  return (
    <div className='footer py-2 px-2 py-sm-2 px-sm-3 d-flex align-items-center justify-content-between gap-2'>
        {menus.map((menu,index)=>{
            return <Link to={menu.link} key={index} className='text-center' >
                {menu.icon}
                <p className="footerText d-block mt-lg-1">{menu.name}</p>
            </Link>
        })}
    </div>
  )
}

export default Footer
