import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";

const GameLogsPage = () => {
  const { auth, lan } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  const [selectedTab, setSelectedTab] = useState("today");
  const tabs = [
    { name: "Today", name_mm: "ဒီနေ့", value: "today" },
    { name: "Yesterday", name_mm: "မနေ့", value: "yesterday" },
    { name: "This Week", name_mm: "ဒီအပတ်", value: "this_week" },
    { name: "Last Week", name_mm: "အရင်အပတ်", value: "last_week" },
  ];

  const {data: logs} = useFetch(BASE_URL + "/wager-logs?type=" + selectedTab);
  console.log(logs);


  return (
    <div className="py-4 pb-5 ps-2 px-sm-3 px-lg-4">
      <h3 className="text-center mb-4">{lan === "en" ? "Game Logs" : "ဂိမ်းမှတ်တမ်း"}</h3>
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
  );
};

export default GameLogsPage;
