import React, { useState } from "react";
import GlobalContext from "./globalContext";

const GlobalState = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("cash");
  const [id, setId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [nativeToken, setNativeToken] = useState("ETH");
  const [email, setEmail] = useState(null);
  const [chipsAmount, setChipsAmount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [tables, setTables] = useState([]);
  const [players, setPlayers] = useState(null);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const [openWalletConnectModal, setOpenWalletConnectModal] = useState(false);

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
        openWalletModal,
        setOpenWalletModal,
        openWalletConnectModal,
        setOpenWalletConnectModal,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
