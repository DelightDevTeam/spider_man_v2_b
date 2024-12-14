import React from 'react'
import { Button } from 'react-bootstrap'
import { FaMoneyBillTransfer, FaMoneyBillTrendUp } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import useLanguage from '../hooks/useLanguage'
import en_data from '../lang/en'
import mm_data from '../lang/mm'

const WalletPage = () => {
  const { lang }  = useLanguage();
  const content = lang === 'en' ? en_data : mm_data;
  return (
    <div className='p-4'>
        <h4 className="text-center mb-4 pb-4">{content.user_wallet}</h4>
      <div className="mb-5 pb-5 d-flex align-items-center justify-content-center  gap-3  gap-sm-5">
        <Link to={'/deposit'}>
        <Button className='customBtn' variant="outline-light">
          <FaMoneyBillTransfer size={23} className='me-2' />
          {content.deposit.title}
        </Button>
        </Link>
        <Link to={'/with-draw'}>
        <Button className='customBtn'   variant="outline-light">
          <FaMoneyBillTrendUp size={23} className='me-2' />
          {content.with_draw.title}
        </Button>
        </Link>
      </div>
    </div>
  )
}

export default WalletPage
