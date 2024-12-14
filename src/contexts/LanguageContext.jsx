import { createContext, useCallback, useMemo, useState } from "react";


export const LanguageContext = createContext(null);

const LanguageProvider=({children})=>{

    const [lang,setLang]=useState(localStorage.getItem('lang') || 'en');

    const toggleLang=useCallback(()=>{
        setLang((prev)=>prev==='en' ? 'mm' : 'en');
        localStorage.setItem('lang',lang==='en'?'mm':'en')
    },[lang] );

    const values=useMemo(()=>({ lang,toggleLang }),[lang])

    return (
        <LanguageContext.Provider value={values}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageProvider;