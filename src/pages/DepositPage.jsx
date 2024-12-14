import React, { useCallback, useState } from 'react'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
import useFormSubmit from '../hooks/useFormSubmit'
import { Button, Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';
import useLanguage from '../hooks/useLanguage';
import en_data from '../lang/en';
import mm_data from '../lang/mm';

const DepositPage = () => {
  const { lang }  = useLanguage();
  const content = lang === 'en' ? en_data.deposit : mm_data.deposit;
  const [selectedBank, setSelectedBank] = useState(null);
  const [step, setStep] = useState(1);
  const { data: banks } = useFetch(BASE_URL + "/agentPaymentType");
  const goToNextStep = (bank) => {
    setSelectedBank(bank);
    setStep(2);
  }

  return (
    <div className='px-2 px-sm-4 py-5 mb-5'>
      <h4 className="text-center mb-4">{content.title}</h4>
      {step === 1 && <ChooseBank goToNextStep={goToNextStep} banks={banks} />}
      {step === 2 && <DepositForm bank={selectedBank} />}
    </div>
  )
}

export default DepositPage


const ChooseBank = ({ banks, goToNextStep }) => {
  const { lang }  = useLanguage();
  const content = lang === 'en' ? en_data : mm_data;
  return <div >
    <h5 className='mb-4'>{content.choose_payment}</h5>
    <div className="d-flex align-items-center gap-3 gap-sm-5">
      {banks.map((bank) => {
        return <div onClick={() => goToNextStep(bank)} key={bank.id}>
          <img className='bankImg' src={bank.image} />
        </div>
      })}
    </div>
  </div>
}

const DepositForm = ({ bank }) => {
  const { lang }  = useLanguage();
  const content = lang === 'en' ? en_data : mm_data;
  const [form, setForm] = useState({
    amount: '', refrence_no: ''
  })
  const handleInput = useCallback((e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  }, [setForm, form])

  const { error, inputSubmit, loading } = useFormSubmit();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = BASE_URL + "/deposit"
    await inputSubmit(url, { ...form, agent_payment_type_id: bank.id }, 'POST',
      '/transfer-history', content.deposit.success
    )
  }
  const copyToClipboard=(number)=>{
    navigator.clipboard.writeText(number)
    toast.success(content.copied)
  }
 
  return <div className='customForm'>
    <div className="d-flex justify-content-between align-items-center gap-2 gap-sm-4 border border-white p-2 rounded-3">
      <div className="d-flex align-items-center gap-2">
        <img className='bankImg' src={bank.image} />
        <div>
          <h6 className="mb-1">{bank.account_name}</h6>
          <h6 className="mb-1">{bank.account_number}</h6>
        </div>
      </div>
      <Button onClick={()=>copyToClipboard(bank.account_number)} className='' variant="outline-light">{content.copy}</Button>
    </div>
    <form onSubmit={handleSubmit} className='mt-4'>
      <div className="mb-3">
        <p className='mb-1'>{content.deposit.amount}</p>
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
        <p className='mb-1'>{content.deposit.transactionId}</p>
        <input type='text'
          className="rounded-3 form-control"
          id='refrence_no'
          value={form.refrence_no}
          onChange={handleInput}
        />
        {error?.refrence_no && <small className='text-danger'>{error.refrence_no}</small>}
      </div>

      <button type='submit' className="mt-4 w-full text-white border border-white rounded-3 text-center py-2 px-4">
        {loading && <Spinner size='sm' className='me-2' />}
        {content.deposit.title}
      </button>
    </form>
  </div>
}
