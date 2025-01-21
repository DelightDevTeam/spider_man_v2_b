import React, { useCallback, useState } from 'react'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
import useFormSubmit from '../hooks/useFormSubmit'
import { Button, Spinner } from 'react-bootstrap';
import useLanguage from '../hooks/useLanguage';
import en_data from '../lang/en';
import mm_data from '../lang/mm';

const WithDrawPage = () => {
  const { lang } = useLanguage();
  const content = lang === 'en' ? en_data.with_draw : mm_data.with_draw;
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
      {step === 2 && <WithDrawForm bank={selectedBank} />}
    </div>
  )
}

export default WithDrawPage


const ChooseBank = ({ banks, goToNextStep }) => {
  const { lang } = useLanguage();
  const content = lang === 'en' ? en_data : mm_data;
  return <>
    <h5 className='mb-4'>{content.choose_payment}</h5>
    <div className="d-flex align-items-center gap-3 gap-sm-5">
      {banks.map((bank) => {
        return <div onClick={() => goToNextStep(bank)} key={bank.id}>
          <img className='bankImg' src={bank.image} />
        </div>
      })}
    </div>
  </>
}

const WithDrawForm = ({ bank }) => {
  const { lang } = useLanguage();
  const content = lang === 'en' ? en_data : mm_data;
  const [form, setForm] = useState({
    amount: '', account_name: '', account_number: '', password: ''
  })
  const handleInput = useCallback((e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  }, [setForm, form])

  const { error, inputSubmit, loading } = useFormSubmit();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = BASE_URL + "/withdrawTest"
    await inputSubmit(url, { ...form, payment_type_id: bank.payment_type_id }, 'POST',
      '/transfer-history', content.with_draw.success
    )
  }

  return <div className='customForm'>
    <div className="d-flex align-items-center justify-content-center  ">
      <img className='bankImg' src={bank.image} />
    </div>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <p className='mb-1'>{content.with_draw.amount}</p>
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
        <p className='mb-1'>{content.with_draw.account_name}</p>
        <input type='text'
          className="rounded-3 form-control"
          id='account_name'
          value={form.account_name}
          onChange={handleInput}
        />
        {error?.account_name && <small className='text-danger'>{error.account_name}</small>}
      </div>
      <div className="mb-3">
        <p className='mb-1'>{content.with_draw.account_number}</p>
        <input type='text'
          className="rounded-3 form-control"
          id='account_number'
          value={form.account_number}
          onChange={handleInput}
        />
        {error?.account_number && <small className='text-danger'>{error.account_number}</small>}
      </div>
      <div className="mb-3">
        <p className='mb-1'>{ lang == 'en' ? 'Password' : 'စကားဝှက်'}</p>
        <input type='password'
          className="rounded-3 form-control"
          id='password'
          value={form.password}
          onChange={handleInput}
        />
        {error?.password && <small className='text-danger'>{error.password}</small>}
      </div>

      <button type='submit' className="mt-4 w-full text-white border border-white rounded-3 text-center py-2 px-4">
        {loading && <Spinner size='sm' className='me-2' />}
        {content.with_draw.title}
      </button>
    </form>
  </div>
}
