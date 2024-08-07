import React from 'react'
import b1 from '../assets/images/b1.png';
import b2 from '../assets/images/b2.png';
import b3 from '../assets/images/b3.png';
import Carousel from 'react-bootstrap/Carousel';

const Banners = ({banners}) => {

  return (
    <Carousel className=' p-2 p-sm-4'>
        {banners && banners.map((banner,index)=>{
            return <Carousel.Item key={index} >
                <img src={banner.img_url} className=' bannerImg  ' />
            </Carousel.Item>
        })}
    </Carousel>
  )
}

export default Banners
