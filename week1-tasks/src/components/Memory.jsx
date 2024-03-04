import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import fetchHistoryData from "../firebaseUtils";
import "./styles/memory.css";

const Memory = () => {
  const { user } = UserAuth();
  const [history, setHistory] = useState([]);

  const fetchData = async () => {
    if (user) {
      const historyData = await fetchHistoryData(user);
      setHistory(historyData);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 10);
    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <div className="Memory">
      <div className="heading">History</div>
      {user ? (
        <div className="data">
          {history.map((item) => (
            <div key={item.id} className="item">
              <div className="equation">{item.equation}</div>
              <div className="time">{item.timestamp}</div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Memory;
