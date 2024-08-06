import React from 'react'
import Navbar from './Navbar'
import Marquee from './Marquee'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import FooterProviders from './FooterProviders'

const Layout = () => {
  return (
    <div >
        <Marquee/>
      <Navbar/>
      <Outlet/>
      <FooterProviders/>
      <Footer/>
     </div>
  )
}

export default Layout
