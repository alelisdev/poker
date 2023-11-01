import React, { useState } from "react";
import GlobalContext from "./globalContext";

const GlobalState = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [nativeToken, setNativeToken] = useState("ETH");
  const [email, setEmail] = useState(null);
  const [chipsAmount, setChipsAmount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [tables, setTables] = useState([]);
  const [players, setPlayers] = useState(null);
  const [ethPrice, setEthPrice] = useState(1);
  const [solPrice, setSolPrice] = useState(1);
  const [currencyMode, setCurrencyMode] = useState("Ether");

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
        userName,
        setUserName,
        email,
        setEmail,
        chipsAmount,
        setChipsAmount,
        nativeToken,
        setNativeToken,
        id,
        setId,
        tables,
        setTables,
        players,
        setPlayers,
        balance,
        setBalance,
        solPrice,
        setSolPrice,
        ethPrice,
        setEthPrice,
        currencyMode,
        setCurrencyMode
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
