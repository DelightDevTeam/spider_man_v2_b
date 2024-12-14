import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Spinner } from 'react-bootstrap';
import launchGame from "../hooks/launchGame";
import useGames from '../hooks/useGames';

const GamesPage = () => {
    const navigate=useNavigate();
    const [searchParams]=useSearchParams();
    const providerId=parseInt(searchParams.get('providerId'),10) ||1;
    const gameTypeId=parseInt(searchParams.get('gameTypeId'),10) ||2;
    const [activeProvider,setActiveProvider]=useState(providerId||1);


    const { data: slotProviders ,loading:slotProvidersLoading} = useFetch(BASE_URL + "/gameTypeProducts/2");
    const { data: casinoProviders ,loading:casinoProvidersLoading} = useFetch(BASE_URL + "/gameTypeProducts/6");
 
     
    const selectedProviders=gameTypeId ===2 ? slotProviders : casinoProviders
    const handleNewProvider=(providerId)=>{
        navigate(`/games?providerId=${providerId}&gameTypeId=${gameTypeId}`)
    }
    const { fetchGames } = useGames();
    const [gameData,setGameData]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [isLastPage,setIsLastPage]= useState(false);
    const [allGamesLoading,setAllGamesLoading]=useState(true);
    const [gamesLoading,setGamesLoading]=useState(false);

    useEffect(()=>{
        (async () => {
            setAllGamesLoading(true);
            setCurrentPage(1);
            const data = await fetchGames(providerId,gameTypeId);
            setGameData([...data.data]);
            setIsLastPage(currentPage==data.last_page)
            setAllGamesLoading(false);
        })();
    },[providerId])

    const loadMore = useCallback(async()=>{
        setGamesLoading(true);
         const nextPage= currentPage+1;
        const data = await fetchGames(providerId,gameTypeId,nextPage);
        setGameData([...gameData,...data.data]);
        const isLast=nextPage==data.last_page;
        setCurrentPage(nextPage);
        setIsLastPage(isLast);
        setGamesLoading(false);
     },[currentPage,gameData])

    console.log('current pg',currentPage);
    console.log('last page',isLastPage)
    console.log('gamesData',gameData);
  return (
    <div className='py-4 px-2 px-sm-4'>
        <h4>{gameTypeId===2 ? 'Slot' : 'Casino'} Games</h4>
        <Swiper
                    className="mySwiper mt-3 w-full"
                    breakpoints={{
                        0: { slidesPerView: 5 },
                        400: { slidesPerView: 6 },
                        865: { slidesPerView: 9 },
                        1000: { slidesPerView: 14 },
                    }}
                >
                    {selectedProviders && selectedProviders?.products?.map((provider) => (
                        <SwiperSlide
                            key={provider.id}
                            onClick={()=>{
                                setActiveProvider(provider.id)
                                handleNewProvider(provider.id)
                            }}
                        >
                            <div
                                role="button"
                                 tabIndex={0}
                                 className={`providerBtn ${activeProvider === provider.id ? 'activeGameList' : ''} 
                                    cursor-pointer text-center fw-semibold py-1 px-0 px-sm-2 gameProvider text-nowrap`}
                            >
                                {provider.provider_code}
                            </div>
                        </SwiperSlide>
                    ))}
        </Swiper>
        {allGamesLoading ? <div className="text-center my-2"><Spinner className='mt-4'  /></div> :
        <div className="row mt-4">
           {gameData?.length>1 ? <>
           {gameData?.map((game)=>{
            return <div onClick={launchGame(game.game_code)} className="mb-3 px-2 col-4 col-sm-3 col-lg-2" key={game.game_id}>
                <img className='img-fluid rounded-4 gameImg' src={game.image_url} />
                <p className='gameProvider mt-1'>{game.game_name}</p>
            </div>
           })}
          {!isLastPage &&  <div onClick={loadMore} className="mt-4 text-center">
            <button className='text-white border py-2 px-4 rounded-3'>{gamesLoading && <Spinner size='sm' className='me-2' /> } Load More</button>
          </div>
           }
            </> : 
           <h4 className="text-center">There is no games...</h4>
           }
        </div>
        }

    </div>
  )
}

export default GamesPage
