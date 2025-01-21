import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Providers({ providers, type }) {
    const navigate = useNavigate();
    return (
        <>
            {providers && providers.map((item, index) => {
                return <div key={index} className="cursor-pointer col-4 col-sm-3 col-lg-2 px-1 px-sm-2 mb-2 mb-sm-3" onClick={() => navigate(`/games?providerId=${item.id}&gameTypeId=${type}`)}>
                    <img src={item.imgUrl} className='gameImg img-fluid rounded-4 rounded-lg-5' />
                </div>
            })}
        </>
    )
}
