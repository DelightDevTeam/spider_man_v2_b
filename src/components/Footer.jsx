import React from 'react'
import { FaGift } from 'react-icons/fa'
import { HiOutlineCash } from 'react-icons/hi'
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import { IoDiamondOutline } from 'react-icons/io5'
import { MdOutlineLockPerson } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Footer = () => {
    const menus=[
        {icon:<IoDiamondOutline size={26} />,name:'Home',link:'/'},
        {icon:<MdOutlineLockPerson  size={26}/>,name:'Change Password',link:'/change-password'},
        {icon:<FaGift  size={24}/>,name:'Promotion',link:'/promotion'},
        {icon:<HiOutlineClipboardDocumentList  size={26}/>,name:'Game Logs',link:'/game-logs'},
        {icon:<HiOutlineCash  size={26} />,name:'Transfer History',link:'/transfer-history'},

    ]
  return (
    <div className='footer py-2 px-2 py-sm-2 px-sm-3 d-flex align-items-center justify-content-between gap-2'>
        {menus.map((menu,index)=>{
            return <Link to={menu.link} key={index} className='text-center' >
                {menu.icon}
                <p className="footerText d-block">{menu.name}</p>
            </Link>
        })}
    </div>
  )
}

export default Footer
