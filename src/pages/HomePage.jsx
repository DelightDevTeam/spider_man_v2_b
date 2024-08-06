import React from 'react'
import Banners from '../components/Banners'
import GameTabs from '../components/GameTabs'

const HomePage = () => {
  return (
    <div>
      <Banners/>
      <div className="p-3 p-sm-4">
      <GameTabs/>
      </div>
    </div>
  )
}

export default HomePage
