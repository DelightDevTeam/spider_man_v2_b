import React, { useContext, useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../hooks/baseURL';
import useFetch from '../hooks/useFetch';
 
const TransferHistoryPage = () => {
  const { auth, lan } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate('/login')
    }
  }, [auth, navigate]);

  const [selectedTab, setSelectedTab] = useState("today");
  const tabs = [
    { name: "Today", name_mm: "ဒီနေ့", value: "today" },
    { name: "Yesterday", name_mm: "မနေ့", value: "yesterday" },
    { name: "This Week", name_mm: "ဒီအပတ်", value: "this_week" },
    { name: "Last Week", name_mm: "အရင်အပတ်", value: "last_week" },
  ];

  const {data: logs, loading} = useFetch(BASE_URL + "/transactions?type=" + selectedTab);
  console.log(logs);
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
              {lan === "en" ? tab.name : tab.name_mm}
            </Button>
          );
        })}
    </div>
    <div className="tableContainer">
    <Table striped bordered hover>
          <thead>
            <tr>
              <th>{lan === "en" ? "Type" : "အမျိုးအစား"}</th>
              <th>{lan === "en" ? "Closing Balance" : "လက်ကျန်ငွေ"}</th>
              <th>{lan === "en" ? "Amount" : "ပမာဏ"}</th>
              <th>{lan === "en" ? "DateTime" : "ရက်စွဲ"}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center text-success">Loading ....</td>
              </tr>
            ) : logs ? logs.map((log, index) => (
            <tr key={index}>
              <td className={`${log.type === "withdraw" ? "text-warning" : "text-success"}`}>{log.type.toUpperCase()}</td>
              <td>{Number(log.closing_balance).toLocaleString()}</td>
              <td className={`${log.amount < 0 ? "text-danger" : "text-success"}`}>{log.amount}</td>
              <td>{dateTime(log.datetime)}</td>
            </tr>
            )): (
              <tr>
                <td colSpan="4" className="text-center text-success">{lan === "en" ? "Data Not Found" : "အချက်အလက်များမရှိသေးပါ။"}</td>
              </tr>
            )}

          </tbody>
    </Table>
    </div>

    </div>
  )
}

export default TransferHistoryPage
