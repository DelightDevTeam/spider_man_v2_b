import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
 
const useAuth=()=>{
    const data=useContext(AuthContext);
    if(data===null) throw new Error("useAuth must be used within AuthContextProvider!")
    else return data;
}

export default useAuth;