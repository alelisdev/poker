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
  const [tnTables, setTnTables] = useState([]);
  const [players, setPlayers] = useState(null);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const [openTournamentModal, setOpenTournamentModal] = useState(false);
  const [previewTable, setPreviewTable] = useState(null);

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
        tnTables,
        setTnTables,
        players,
        setPlayers,
        balance,
        setBalance,
        openWalletModal,
        setOpenWalletModal,
        openTournamentModal,
        setOpenTournamentModal,
        activeTab,
        setActiveTab,
        previewTable,
        setPreviewTable,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
