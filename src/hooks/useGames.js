import axios from "axios";
import BASE_URL from "./baseURL";

const useGames=()=>{
    const fetchGames= async (providerId,gameTypeId,page=1)=>{
       try {
         const res = await axios.get(`${BASE_URL}/gamelistTest/${providerId}/${gameTypeId}?page=${page}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         })
         return res.data.data;
       } catch (error) {
            console.log('Error when fetching games: ',error);
       }
    }
    return {fetchGames}
}

export default useGames;