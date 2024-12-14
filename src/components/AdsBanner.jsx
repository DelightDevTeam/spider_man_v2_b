import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
 
const AdsBanner = () => {
  const {data: ads} = useFetch(BASE_URL + "/ads-banner");
  // console.log(ads);
  
    const MySwal = withReactContent(Swal)

    const adsFire=()=>{
        MySwal.fire({
             imageUrl: ads?.img_url,
            imageHeight:150,
             text:"🙏🏻မင်္ဂလာရှိသော နေ့ခင်းလေးပါ👦🏻 သူငယ်ချင်းမိတ်ဆက် 10%💰 🏠အိမ်မှာနေရင်း 🎰 Spiderman မှာပူးပေါင်းပြီး🤝 အလွယ်တကူ ဝင်ငွေရှာလိုက်ပါ သူငယ်ချင်းမိတ်ဆက်ပေးပြီး ဘယ်မှာမှ မရနှိင်တဲ့ 🏆ဆုလက်ဆောင် 10% များရယူပါနော်  Spiderman 🙏🙏🙏🤝🙏🙏🙏"
           })
    }
    adsFire();
}

export default AdsBanner