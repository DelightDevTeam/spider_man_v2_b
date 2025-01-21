import React from 'react'
import { Spinner } from 'react-bootstrap'
import launchGame from '../hooks/launchGame'

export default function Games({games, title, loading}) {
    return (
        <>
            <h4 className='text-white mb-2 mb-sm-4'>{title}</h4>
            <div className="row mb-4">
                {loading ? <Spinner /> :
                    games && games.map((item, index) => {
                        return <div key={index} className="cursor-pointer col-4 col-sm-3 col-lg-2 px-1 px-sm-2 mb-2 mb-sm-3" onClick={launchGame(item.game_code)}>
                            <img src={item.image_url} className='gameImg img-fluid rounded-4 rounded-lg-5' />
                        </div>
                    })}
            </div>
        </>
    )
}
