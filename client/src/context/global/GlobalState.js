import React, { useState } from "react";
import GlobalContext from "./globalContext";

const GlobalState = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [curCurrency, setCurCurrency] = useState({
    coinType: "ETH",
    type: "native",
  });
  const [id, setId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chipsAmount, setChipsAmount] = useState(null);
  const [tables, setTables] = useState([]);
  const [players, setPlayers] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
        userName,
        setUserName,
        email,
        setEmail,
        balance,
        setBalance,
        chipsAmount,
        setChipsAmount,
        id,
        setId,
        tables,
        setTables,
        players,
        setPlayers,
        curCurrency,
        setCurCurrency,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
