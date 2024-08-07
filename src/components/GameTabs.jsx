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
const GameTabs = () => {
    const { lan } = useContext(AuthContext);
    const [selectedTab,setSelectedTab]=useState('all')
    const tabs=[
        {img:all,name:'All Games',name_mm: "ဂိမ်းအားလုံး",value:'all'},
        {img:slot,name:'Slots',name_mm: "စလော့",value:'slot'},
        {img:casino,name:'Live Casino',name_mm: "ကာစီနို",value:'casino'},
        {img:sport,name:'Sports',name_mm: "အားကစား",value:'sport'},
        {img:fish,name:'Fishing',name_mm: "ငါးဖမ်းဂိမ်း",value:'fishing'},
    ]
    const slots=[sg1,sg2,sg3,sg4,sg5,sg6,sg8,sg9,sg10,sg11,sg12]
    const casinos=[cg1,cg2,cg3,cg4,cg5,cg6,cg8,cg9,cg10,cg11]
    const sports=[sb1,sb2]
    const fishing=[fg1,fg2,fg3,fg4]
  return (
    <div className='row cursor-pointer mb-5'>
        <div className="div1  px-0">
            <div className="d-flex flex-column gap-3">
                {tabs.map((tab,index)=>{
                    return <div onClick={()=>setSelectedTab(tab.value)} key={index} className='gameTab rounded-3 p-1 text-center'>
                        <img src={tab.img} className='gameTabImg' />
                        <p className='gameTabText'>{lan === "en" ? tab.name : tab.name_mm}</p>
                    </div>
                })}
            </div>
        </div>
        <div className="div2 ps-3 ps-sm-4">
            {selectedTab!=='all'  &&  <h4 className='text-white mb-2 mb-sm-4'>{selectedTab.toUpperCase()} GAMES</h4>}
            {selectedTab==='all' && <>
                <h4 className='text-white mb-2 mb-sm-4'>{lan === "en" ? "SLOTS" : "စလော့"}</h4>
             <div className="row mb-4">
                {slots.map((slot,index)=>{
                    return <div key={index} className="cursor-pointer col-4 col-sm-3 col-lg-2 px-1 px-sm-2 mb-2 mb-sm-3">
                        <img src={slot} className='gameImg img-fluid rounded-4 rounded-lg-5' />
                    </div>
                 })}
            </div>
            <h4 className='text-white mb-2 mb-sm-4'>{lan === "en" ? "LIVE CASINO" : "ကာစီနို"}</h4>
             <div className="row mb-4">
                {casinos.map((slot,index)=>{
                    return <div key={index} className="cursor-pointer col-4 col-sm-3 col-lg-2 px-1 px-sm-2 mb-2 mb-sm-3">
                        <img src={slot} className='gameImg img-fluid rounded-4 rounded-lg-5' />
                    </div>
                 })}
            </div>
            <h4 className='text-white mb-2 mb-sm-4'>{lan === "en" ? "SPORT BOOK" : "အားကစား"}</h4>
             <div className="row mb-4">
                {sports.map((slot,index)=>{
                    return <div key={index} className="cursor-pointer col-4 col-sm-3 col-lg-2 px-1 px-sm-2 mb-2 mb-sm-3">
                        <img src={slot} className='gameImg img-fluid rounded-4 rounded-lg-5' />
                    </div>
                 })}
            </div>
            <h4 className='text-white mb-2 mb-sm-4'>{lan === "en" ? "FISHING" : "ငါးဖမ်း"}</h4>
             <div className="row mb-4">
                {fishing.map((slot,index)=>{
                    return <div key={index} className="cursor-pointer col-4 col-sm-3 col-lg-2 px-1 px-sm-2 mb-2 mb-sm-3">
                        <img src={slot} className='gameImg img-fluid rounded-4 rounded-lg-5' />
                    </div>
                 })}
            </div>
            </> }
            {selectedTab==='slot' && <div className="row">
                {slots.map((slot,index)=>{
                    return <div key={index} className="cursor-pointer col-4 col-sm-3 col-lg-2 px-1 px-sm-2 mb-2 mb-sm-3">
                        <img src={slot} className='gameImg img-fluid rounded-4 rounded-lg-5' />
                    </div>
                })}
            </div> }
            {selectedTab==='casino' && <div className="row">
                {casinos.map((slot,index)=>{
                    return <div key={index} className="cursor-pointer col-4 col-sm-3 col-lg-2 px-1 px-sm-2 mb-2 mb-sm-3">
                        <img src={slot} className='gameImg img-fluid rounded-4 rounded-lg-5' />
                    </div>
                })}
            </div> }
            {selectedTab==='sport' && <div className="row">
                {sports.map((slot,index)=>{
                    return <div key={index} className="cursor-pointer col-4 col-sm-3 col-lg-2 px-1 px-sm-2 mb-2 mb-sm-3">
                        <img src={slot} className='gameImg img-fluid rounded-4 rounded-lg-5' />
                    </div>
                })}
            </div> }
            {selectedTab==='fishing' && <div className="row">
                {fishing.map((slot,index)=>{
                    return <div key={index} className="cursor-pointer col-4 col-sm-3 col-lg-2 px-1 px-sm-2 mb-2 mb-sm-3">
                        <img src={slot} className='gameImg img-fluid rounded-3 rounded-sm-4 rounded-lg-5' />
                    </div>
                })}
            </div> }
        </div>
    </div>
  )
}

export default GameTabs
