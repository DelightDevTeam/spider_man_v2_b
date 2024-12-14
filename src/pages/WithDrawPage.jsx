import React, { useCallback, useState } from 'react'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
import useFormSubmit from '../hooks/useFormSubmit'
 import { Button, Spinner } from 'react-bootstrap';

const WithDrawPage = () => {
    const [selectedBank,setSelectedBank]=useState(null);
    const [step,setStep]=useState(1);
    const {data: banks} = useFetch(BASE_URL + "/agentPaymentType"); 
    const goToNextStep=(bank)=>{
        setSelectedBank(bank);
        setStep(2);
    }

    return (
    <div className='px-2 px-sm-4 py-5 mb-5'>
      <h4 className="text-center mb-4">With Draw</h4>
    {step===1 &&  <ChooseBank goToNextStep={goToNextStep} banks={banks} />}
    {step===2 &&  <WithDrawForm bank={selectedBank} /> }
    </div>
  )
}

export default WithDrawPage


const ChooseBank=({banks,goToNextStep})=>{
    return  <>
    <h5 className='mb-4'>Choose Payment Method </h5>
    <div className="d-flex align-items-center gap-3 gap-sm-5">
      {banks.map((bank)=>{
          return <div onClick={()=>goToNextStep(bank)} key={bank.id}>
              <img className='bankImg' src={bank.image} />
          </div>
      })}
    </div>
    </>
}

const WithDrawForm=({bank})=>{

    const [form,setForm]=useState({
        amount:'',account_name:'',account_number:''
    })
    const handleInput=useCallback((e)=>{
        setForm({...form,[e.target.id]:e.target.value});
    },[setForm,form])

    const { error,inputSubmit,loading } = useFormSubmit();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const url=BASE_URL + "/withdraw"
       await inputSubmit (url,{...form,payment_type_id:bank.id},'POST',
        '/wallet','With Draw successfully!'
       )
    }

    return <div className='customForm'>
    <div className="d-flex align-items-center justify-content-center  ">
        <img className='bankImg' src={bank.image} />
     </div>
    <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <p className='mb-1'>Amount</p>
                <input type='text' 
                 
                className="rounded-3 form-control" 
                id="amount"
                value={form.amount}
                onChange={handleInput}
                
                />
                {error?.amount && <small className='text-danger'>{error.amount}</small>}
                {/* {errMsg && <small className='text-danger'>{errMsg}</small>} */}
              </div>
              <div className="mb-3">
                <p className='mb-1'> Account Name</p>
                <input type='text' 
                 className="rounded-3 form-control"
               id='account_name'
               value={form.account_name}
               onChange={handleInput}
                />
                {error?.account_name && <small className='text-danger'>{error.account_name}</small>}
              </div>
              <div className="mb-3">
                <p className='mb-1'> Account Number</p>
                <input type='text' 
                 className="rounded-3 form-control"
               id='account_number'
               value={form.account_number}
               onChange={handleInput}
                />
                {error?.account_number && <small className='text-danger'>{error.account_number}</small>}
              </div>
              
              <button type='submit' className="mt-4 w-full text-white border border-white rounded-3 text-center py-2 px-4">
                {loading && <Spinner size='sm' className='me-2' />}
                Submit
              </button>
            </form>
    </div>
}
