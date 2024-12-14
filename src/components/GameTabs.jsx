import React, { useContext, useState } from 'react'
import all from '../assets/images/all.png'
import slot from '../assets/images/slot.png'
import casino from '../assets/images/casino.png'
import sport from '../assets/images/sport.png'
import fish from '../assets/images/fish.png'
import sg1 from '../assets/images/sg1.png'
import sg2 from '../assets/images/sg2.png'
import sg3 from '../assets/images/sg3.png'
import sg4 from '../assets/images/sg4.png'
import sg5 from '../assets/images/sg5.png'
import sg6 from '../assets/images/sg6.png'
import sg8 from '../assets/images/sg8.png'
import sg9 from '../assets/images/sg9.png'
import sg10 from '../assets/images/sg10.png'
import sg11 from '../assets/images/sg11.png'
import sg12 from '../assets/images/sg12.png'
import cg1 from '../assets/images/cg1.png'
import cg2 from '../assets/images/cg2.png'
import cg3 from '../assets/images/cg3.png'
import cg4 from '../assets/images/cg4.png'
import cg5 from '../assets/images/cg5.png'
import cg6 from '../assets/images/cg6.png'
import cg8 from '../assets/images/cg8.png'
import cg9 from '../assets/images/cg9.png'
import cg10 from '../assets/images/cg10.png'
import cg11 from '../assets/images/cg11.png'
import sb1 from '../assets/images/sb1.png'
import sb2 from '../assets/images/sb2.png'
import fg1 from '../assets/images/fg1.png'
import fg2 from '../assets/images/fg2.png'
import fg3 from '../assets/images/fg3.png'
import fg4 from '../assets/images/fg4.png'
import { AuthContext } from '../contexts/AuthContext'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import launchGame from '../hooks/launchGame'
import useLanguage from '../hooks/useLanguage'
import en_data from '../lang/en'
import mm_data from '../lang/mm'
const GameTabs = () => {
    const { lang }  = useLanguage();
    const content = lang === 'en' ? en_data.home : mm_data.home;
    const navigate = useNavigate();
    const [selectedTab,setSelectedTab]=useState('all');

    const tabs=[
        {img:all,name:content.all_games,value:'all'},
        {img:all,name:content.hot_games,value:'hot'},
         {img:slot,name:content.slots,value:'slot'},
        {img:casino,name:content.casinos,value:'casino'},
        // {img:sport,name:'Sports',name_mm: "အားကစား",value:'sport'},
        // {img:fish,name:'Fishing',name_mm: "ငါးဖမ်းဂိမ်း",value:'fishing'},
    ]
    const { data: hotGames,loading:hotLoading } = useFetch(BASE_URL + "/hotgamelist");
    console.log('hotGames',hotGames)

    const { data: slotGames ,loading:slotLoading} = useFetch(BASE_URL + "/gameTypeProducts/2");
    const slots = slotGames?.products;
 
    const { data: casinoGames,loading:casinoLoading } = useFetch(BASE_URL + "/gameTypeProducts/6");
    const casinos = casinoGames?.products;
  
  return (
    <div className='row cursor-pointer mb-5'>
        <div className="div1  px-0">
            <div className="d-flex flex-column gap-3">
                {tabs.map((tab,index)=>{
                    return <div onClick={()=>setSelectedTab(tab.value)} key={index} className='gameTab rounded-3 p-1 text-center'>
                        <img src={tab.img} className='gameTabImg' />
                        <p className='gameTabText'>{tab.name}</p>
                    </div>
                })}
            </div>
        </div>
        <div className="div2 ps-3 ps-sm-4">
            {/* {selectedTab!=='all'  &&  <h4 className='text-white mb-2 mb-sm-4'>{selectedTab.toUpperCase()} GAMES</h4>} */}
            {selectedTab==='all' && <>
                <>
                <h4 className='text-white mb-2 mb-sm-4'>{content.hot_games}</h4>
                <div className="row mb-4">
                    { hotLoading ? <Spinner/> :
                    hotGames && hotGames.map((item,index)=>{
                        return <div key={index} className="cursor-pointer col-4 col-sm-3 col-lg-2 px-1 px-sm-2 mb-2 mb-sm-3"  onClick={launchGame(item.game_code)}>
                            <img src={item.image_url} className='gameImg img-fluid rounded-4 rounded-lg-5' />
                        </div>
                    })}
                </div>
                </>
                <h4 className='text-white mb-2 mb-sm-4'>{content.slots}</h4>
                <div className="row mb-4">
                    {slotLoading ? <Spinner/> :
                    slots && slots.map((slot,index)=>{
                        return <div key={index} className="cursor-pointer col-4 col-sm-3 col-lg-2 px-1 px-sm-2 mb-2 mb-sm-3" onClick={()=>navigate(`/games?providerId=${slot.id}&gameTypeId=2`)}>
                            <img src={slot.imgUrl} className='gameImg img-fluid rounded-4 rounded-lg-5' />
                        </div>
                    })}
                </div>
                <h4 className='text-white mb-2 mb-sm-4'>{content.casinos}</h4>
                <div className="row mb-4">
                    {
                    casinoLoading ? <Spinner/> :
                    casinos && casinos.map((casino,index)=>{
                        return <div key={index} className="cursor-pointer col-4 col-sm-3 col-lg-2 px-1 px-sm-2 mb-2 mb-sm-3" onClick={()=>navigate(`/games?providerId=${casino.id}&gameTypeId=6`)}>
                            <img src={casino.imgUrl} className='gameImg img-fluid rounded-4 rounded-lg-5' />
                        </div>
                    })}
                </div>
                
            </> }
            {selectedTab==='hot' && (
                <>
                <h4 className='text-white mb-2 mb-sm-4'>{content.hot_games}</h4>
                <div className="row mb-4">
                    { hotLoading ? <Spinner/> :
                    hotGames && hotGames.map((item,index)=>{
                        return <div key={index} className="cursor-pointer col-4 col-sm-3 col-lg-2 px-1 px-sm-2 mb-2 mb-sm-3"  onClick={launchGame(item.game_code)}>
                            <img src={item.image_url} className='gameImg img-fluid rounded-4 rounded-lg-5' />
                        </div>
                    })}
                </div>
                </>
            )}
            {selectedTab==='slot' && (
                <>
                <h4 className='text-white mb-2 mb-sm-4'>{content.slot_games}</h4>
                <div className="row mb-4">
                    { slotLoading ? <Spinner/> :
                    slots && slots.map((slot,index)=>{
                        return <div key={index} className="cursor-pointer col-4 col-sm-3 col-lg-2 px-1 px-sm-2 mb-2 mb-sm-3"  onClick={()=>navigate(`/games?providerId=${slot.id}&gameTypeId=2`)}>
                            <img src={slot.imgUrl} className='gameImg img-fluid rounded-4 rounded-lg-5' />
                        </div>
                    })}
                </div>
                </>
            )}
            {selectedTab==='casino' && (
                <>
                <h4 className='text-white mb-2 mb-sm-4'>{content.casino_games}</h4>
                <div className="row mb-4">
                    { casinoLoading ? <Spinner/> :
                    casinos && casinos.map((casino,index)=>{
                        return <div key={index} className="cursor-pointer col-4 col-sm-3 col-lg-2 px-1 px-sm-2 mb-2 mb-sm-3"  onClick={()=>navigate(`/games?providerId=${casino.id}&gameTypeId=6`)}>
                            <img src={casino.imgUrl} className='gameImg img-fluid rounded-4 rounded-lg-5' />
                        </div>
                    })}
                </div>
                </>
            )}
           
        </div>
    </div>
  )
}

export default GameTabs
