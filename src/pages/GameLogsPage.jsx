import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import useLanguage from "../hooks/useLanguage";
import en_data from "../lang/en";
import mm_data from "../lang/mm";

const GameLogsPage = () => {
  const { lang }  = useLanguage();
  const content = lang === 'en' ? en_data.game_logs : mm_data.game_logs;
  const [selectedTab, setSelectedTab] = useState("today");
  const tabs = [
    { name: content.today, value: "today" },
    { name: content.yesterday, value: "yesterday" },
    { name:content.this_week, value: "this_week" },
    { name: content.last_week, value: "last_week" },
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
      <h3 className="text-center mb-4">{content.title}</h3>
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
              <th>{content.from}</th>
              <th>{content.to}</th>
              <th>{content.game_name}</th>
              <th>{content.count}</th>
              <th>{content.bet_amount}</th>
              <th>{content.win_lose}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center text-success">{content.loading}</td>
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
                <td colSpan="6" className="text-center text-success fw-semibold">{content.no_data}</td>
              </tr>
            )}

          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default GameLogsPage;
