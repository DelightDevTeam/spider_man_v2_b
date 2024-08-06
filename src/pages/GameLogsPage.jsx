import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap';
 
const GameLogsPage = () => {
    const [selectedTab,setSelectedTab]=useState(1);
    const tabs=[
        {name:'Today',value:1},
         {name:'Yesterday',value:2},
          {name:'This Week',value:3}, 
          {name:'Last Week',value:4},
    ]
  return (
    <div className='py-4 pb-5 ps-2 px-sm-3 px-lg-4'>
      <h3 className="text-center fw-semibold mb-4">Game Logs</h3>
    <div className="d-flex flex-wrap align-items-ceter gap-2 gap-sm-3 mb-4">
        {tabs.map((tab,index)=>{
            return <Button className='tabText' key={index} onClick={()=>setSelectedTab(tab.value)} variant={selectedTab === tab.value ? 'primary' :"outline-primary"}>{tab.name}</Button>
        })}
    </div>
    <div className="tableContainer">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Game Result</th>
          <th>Balance</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Win</td>
          <td>1000</td>
          <td>{new Date().toDateString()}</td>
        </tr>
       
      </tbody>
    </Table>
    </div>

    </div>
  )
}

export default GameLogsPage
