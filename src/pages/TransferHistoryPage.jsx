import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Badge, Button, Spinner, Table } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../hooks/baseURL';
import useFetch from '../hooks/useFetch';
 
const TransferHistoryPage = () => {
 
  const [selectedTab, setSelectedTab] = useState(1);
  const tabs = [
    { name: "Deposit", name_mm: "ဒီနေ့", value: 1 },
    { name: "Withdraw", name_mm: "မနေ့", value: 2 },
  ];

  const {data: depositLogs, loading:depositLoading} = useFetch(BASE_URL + "/depositlog?page=1" );
  const {data: withDrawLogs, loading:withDrawLoading} = useFetch(BASE_URL + "/withdrawlog" );
  const logs=useMemo(()=>{
   return selectedTab===1 ? depositLogs : withDrawLogs
  },[selectedTab,depositLogs,withDrawLogs])
  
  // console.log(logs);
  

  const dateTime = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
      // second: '2-digit'
    });
  }
  const statusColor=(status)=>{
    let color='';
    switch (status) {
      case 'Pending':
         color='warning';
        break;
        case 'Success':
          color= 'success';
        break;
       default:
        color= 'danger';
        break;
     }
     return color;
  }

  return (
    <div className='py-4 pb-5 ps-2 px-sm-3 px-lg-4'>
      <h3 className="text-center fw-semibold mb-4">Transfer History</h3>
    <div className="d-flex flex-wrap align-items-ceter gap-2 gap-sm-3 mb-4">
      {tabs.map((tab, index) => {
          return (
            <Button
              size="sm"
              className="tabText"
              key={index}
              onClick={() => setSelectedTab(tab.value)}
              variant={selectedTab === tab.value ? "light" : "outline-light"}
            >
              {tab.name}
            </Button>
          );
        })}
    </div>
    <div className="tableContainer">
    <Table striped bordered hover className='text-center'>
          <thead>
            <tr>
              <th>Bank</th>
              <th>Amount</th>
              <th>Account Name</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {depositLoading||withDrawLoading ? (
              <tr>
               <td colSpan="4" className='text-center'>Loading....</td>
              </tr>
            ) : logs ? logs.map((log, index) => (
            <tr key={index}>
              <td>
                {log.payment_type}
              </td>
              <td>{Number(log.amount)}Ks</td>
              <td  >{log.account_name}</td>
              
              <td>
                <Badge bg={`${statusColor(log.status)}`}>{log.status}</Badge>
              </td>
              <td>{dateTime(log.datetime)}</td>
            </tr>
            )): (
              <tr>
                <td colSpan="4" className="text-center text-success">No Data...</td>
              </tr>
            )}

          </tbody>
    </Table>
    </div>

    </div>
  )
}

export default TransferHistoryPage
