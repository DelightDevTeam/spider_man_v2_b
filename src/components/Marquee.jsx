import React from 'react'

const Marquee = ({bannerText}) => {
  
  return (
    <marquee behavior="" direction="left" className='bg-black text-white py-2 px-3'>
        {bannerText && bannerText.text}
    </marquee>
  )
}

export default Marquee
