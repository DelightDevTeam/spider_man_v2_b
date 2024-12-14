import React, { useCallback, useState } from 'react'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
import useFormSubmit from '../hooks/useFormSubmit'
import { Button, Spinner } from 'react-bootstrap';

const DepositPage = () => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [step, setStep] = useState(1);
  const { data: banks } = useFetch(BASE_URL + "/agentPaymentType");
  const goToNextStep = (bank) => {
    setSelectedBank(bank);
    setStep(2);
  }

  return (
    <div className='px-2 px-sm-4 py-5 mb-5'>
      <h4 className="text-center mb-4">Deposit</h4>
      {step === 1 && <ChooseBank goToNextStep={goToNextStep} banks={banks} />}
      {step === 2 && <DepositForm bank={selectedBank} />}
    </div>
  )
}

export default DepositPage


const ChooseBank = ({ banks, goToNextStep }) => {
  return <div >
    <h5 className='mb-4'>Choose Payment Method </h5>
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
      '/transfer-history', 'Deposit successfully!'
    )
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
      <Button className='' variant="outline-light">Copy</Button>
    </div>
    <form onSubmit={handleSubmit} className='mt-4'>
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
        <p className='mb-1'> Transaction ID</p>
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
        Submit
      </button>
    </form>
  </div>
}
