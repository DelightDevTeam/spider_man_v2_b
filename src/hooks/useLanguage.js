import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { LanguageContext } from "../contexts/LanguageContext";
 
const useLanguage=()=>{
    const data=useContext(LanguageContext);
    if(data===null) throw new Error("useLanguage must be used within LanguageProvider!")
    else return data;
}

export default useLanguage;