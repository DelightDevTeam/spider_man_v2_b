import React from 'react'
import Navbar from './Navbar'
import Marquee from './Marquee'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import FooterProviders from './FooterProviders'
import {AuthContextProvider} from '../contexts/AuthContext'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
import LanguageProvider from '../contexts/LanguageContext'

const Layout = () => {
   const {data: bannerText} = useFetch(BASE_URL + '/banner_Text');

  return (
    <div >
      <AuthContextProvider>
        <LanguageProvider>
        <Marquee bannerText={bannerText} />
        <Navbar/>
        <Outlet/>
        <FooterProviders/>
        <Footer/>
        </LanguageProvider>
      </AuthContextProvider>
     </div>
  )
}

export default Layout
