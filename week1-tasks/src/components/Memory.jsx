import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import {fetchHistoryData , deleteHistoryData} from "../firebaseUtils"
import "./styles/memory.css";
import DeleteIcon from '@mui/icons-material/Delete';

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

  const handleDelete = async (equation) => {
    if (user) {
      await deleteHistoryData(user, equation);
      fetchData(); 
    }
  };

  return (
    <div className="Memory">
      <div className="heading">History</div>
      {user ? (
        <div className="data">
          {history.map((item) => (
            <div key={item.id} className="item">
              <div className="equation">{item.equation}</div>
              <div className="item2">
              <div className="time">{item.timestamp}</div>
              <button className="delete" onClick={() => handleDelete(item.equation)}><DeleteIcon /></button>
              </div>
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
