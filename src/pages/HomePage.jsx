import React, { useContext } from 'react'
import Banners from '../components/Banners'
import GameTabs from '../components/GameTabs'
import { AuthContext } from '../contexts/AuthContext'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
import AdsBanner from '../components/AdsBanner'

const HomePage = () => {
  const { lan } = useContext(AuthContext);
  const {data: banners} = useFetch(BASE_URL + '/banner');
  
  return (
    <div>
      <AdsBanner/>
      <Banners banners={banners}/>
      <div className="p-3 p-sm-4">
      <GameTabs/>
      </div>
    </div>
  )
}

export default HomePage
