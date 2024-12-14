import React from 'react'
import { GrPrevious } from 'react-icons/gr'
import twitter from '../assets/images/twitter.png'
import titok from '../assets/images/titok.png'
import fb from '../assets/images/fb.png'
import ig from '../assets/images/ig.png'
import { Link } from 'react-router-dom'
import viber from '../assets/images/viber.png'
 import tele from '../assets/images/tele.png'
import fb2 from '../assets/images/fb2.png'
import toast from 'react-hot-toast'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
import { Spinner } from 'react-bootstrap'
import useLanguage from '../hooks/useLanguage'
import en_data from '../lang/en'
import mm_data from '../lang/mm'
const ContactPage = () => {
  const { lang }  = useLanguage();
  const content = lang === 'en' ? en_data : mm_data;
    const { data:contacts,loading }  = useFetch(`${BASE_URL}/contact`)
    console.log('contacts',contacts);
  const contact=[
    {img:viber,text:'+96912345689',link:'viber.com'},
    {img:tele,text:'t.me/burma368',link:'telegram.org'},
    {img:fb2,text:'www.facebook.com/123',link:'facebook.com'},
]
const copyLink=(link)=>{
  navigator.clipboard.writeText(link)
  toast.success(content.copied)
}
    const socials=[
        {img:twitter,link:'/'},
        {img:titok,link:'/'},
        {img:fb,link:'/'},
        {img:ig,link:'/'}
    ]
  return (
    <div className='p-2 py-3 py-sm-5'>
       <div className="mb-2 d-flex align-items-center gap-2 gap-sm-5" >
        
        <div className='mt-3 mx-auto'>
            <h4 className='text-center text-white fw-semibold'>{content.contact.title}</h4>
        </div>
       
      </div>
      <div   className='text-black p-3 p-sm-4 rounded-3'>
    {loading ? <div className="text-center">
        <Spinner className='text-white' />
    </div>  :
     <div className="row">
     {contact.map((item,index)=>{
            return <div key={index} className="col-sm-6 col-lg-4 px-2 px-lg-4  mb-3 py-2"  >
              <div  className='text-white rounded-4  contactCard py-2 '  >
                <div  className="d-flex align-items-center px-3 gap-4" >
                    <div className="">
                    <img src={item.img} className='contactImg mx-auto ' />
                    </div>
                    <div className=" mb-2">
                    <p className='mt-2'>{item.text}</p>
             <button onClick={()=>copyLink(item.link)} className=' bg-info text-white fw-semibold rounded-5 px-3 mt-2'>{content.copy}</button>
             </div>
              </div>
             </div>
            </div>
        })}
     </div> }
     <div className="w-full mt-5 ">
        <div className="row">
        <hr  className='col-4 mt-2'/>
        <h4 className="col-4 text-center text-white fw-semibold">{content.contact.social_medias}</h4>
        <hr  className='col-4 mt-2' />
        </div>
     </div>
        <div className="mt-3 d-flex align-items-center justify-content-center  gap-3">
            {socials.map((social,index)=>{
                return <Link key={index} to={social.link}>
                    <img className='socialIcon' src={social.img}  />
                </Link>
            })}
        </div>
      </div>
    </div>
  )
}

export default ContactPage