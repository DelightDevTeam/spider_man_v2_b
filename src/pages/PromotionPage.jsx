import React from 'react'
import p1 from '../assets/images/p1.png'
import p2 from '../assets/images/p2.png'
import p3 from '../assets/images/p3.png'


const PromotionPage = () => {
    const promotions=[p1,p2,p3]
  return (
    <div className='py-4 px-2 px-4 px-lg-5 pb-5 mb-5'>
        <h3 className="fw-semibold mb-4 text-center">Promotion</h3>
        {promotions.map((img,index)=>{
            return <div key={index} className='mb-4'>
                <img src={img} className='img-fluid rounded-3 rounded-sm-5  w-full' />
            </div>
        })}
    </div>
  )
}

export default PromotionPage
