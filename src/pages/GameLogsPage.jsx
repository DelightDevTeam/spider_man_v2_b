import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";

const GameLogsPage = () => {
 
  const [selectedTab, setSelectedTab] = useState("today");
  const tabs = [
    { name: "Today", name_mm: "ဒီနေ့", value: "today" },
    { name: "Yesterday", name_mm: "မနေ့", value: "yesterday" },
    { name: "This Week", name_mm: "ဒီအပတ်", value: "this_week" },
    { name: "Last Week", name_mm: "အရင်အပတ်", value: "last_week" },
  ];

  const {data: logs, loading} = useFetch(BASE_URL + "/wager-logs?type=" + selectedTab);

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
    <div className="py-4 pb-5 ps-2 px-sm-3 px-lg-4">
      <h3 className="text-center mb-4">Game Logs</h3>
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Game Name</th>
              <th>Count</th>
              <th>Bet Amount</th>
              <th>Win/Lose</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center text-success">Loading ....</td>
              </tr>
            ) : logs.length>0 ? logs.map((log, index) => (
            <tr key={index}>
              <td>{dateTime(log.from_date)}</td>
              <td>{dateTime(log.to_date)}</td>
              <td>{log.product}</td>
              <td>{log.total_count}</td>
              <td>{log.total_bet_amount}Ks</td>
              <td  >{log.total_transaction_amount}Ks</td>
            </tr>
            )): (
              <tr>
                <td colSpan="6" className="text-center text-success fw-semibold">No Data...</td>
              </tr>
            )}

          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default GameLogsPage;
