import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  CALL,
  CHECK,
  FOLD,
  JOIN_TABLE,
  LEAVE_TABLE,
  RAISE,
  REBUY,
  SIT_DOWN,
  STAND_UP,
  TABLE_JOINED,
  TABLE_LEFT,
  TABLE_UPDATED,
} from "../../pokergame/actions";
import authContext from "../auth/authContext";
import socketContext from "../websocket/socketContext";
import GameContext from "./gameContext";
import globalContext from "../global/globalContext";

const GameState = ({ history, children }) => {
  const { socket } = useContext(socketContext);
  const { loadUser } = useContext(authContext);
  const { setTables, setTnTables, activeTab, tnRegisterName } =
    useContext(globalContext);

  const [joined, setJoined] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentTable, setCurrentTable] = useState(null);
  const [isPlayerSeated, setIsPlayerSeated] = useState(false);
  const [seatId, setSeatId] = useState(null);
  const [turn, setTurn] = useState(false);
  const [turnTimeOutHandle, setHandle] = useState(null);

  const currentTableRef = React.useRef(currentTable);

  useEffect(() => {
    currentTableRef.current = currentTable;
    isPlayerSeated &&
      seatId &&
      currentTable.seats[seatId] &&
      turn !== currentTable.seats[seatId].turn &&
      setTurn(currentTable.seats[seatId].turn);
    // eslint-disable-next-line
  }, [currentTable]);

  useEffect(() => {
    if (turn && !turnTimeOutHandle) {
      const handle = setTimeout(fold, 15000);
      setHandle(handle);
    } else {
      turnTimeOutHandle && clearTimeout(turnTimeOutHandle);
      turnTimeOutHandle && setHandle(null);
    }
    // eslint-disable-next-line
  }, [turn]);

  useEffect(() => {
    if (socket) {
      window.addEventListener("unload", leaveTable);
      window.addEventListener("close", leaveTable);

      socket.on(TABLE_UPDATED, ({ table, message, from }) => {
        setCurrentTable(table);
        message && addMessage(message);
      });

      socket.on(TABLE_JOINED, ({ tables, tableId }) => {
        setCurrentTable(tables[tableId]);
      });

      socket.on(TABLE_LEFT, ({ tables, tableId }) => {
        setCurrentTable(null);
        const cashes = tables.filter((table) => table.name.includes("Table"));
        const tournaments = tables.filter((table) =>
          table.name.includes("Tournament")
        );
        setTables(cashes);
        setTnTables(tournaments);
        loadUser(localStorage.token);
        setMessages([]);
      });
    }
    return () => leaveTable();
    // eslint-disable-next-line
  }, [socket]);

  const joinTable = (tableId) => {
    if (tableId > 16) setJoined([`Tournament ${tableId - 15}`]);
    else setJoined([`Table ${tableId}`]);
    socket.emit(JOIN_TABLE, tableId);
  };

  const leaveTable = () => {
    isPlayerSeated && standUp();
    currentTableRef &&
      currentTableRef.current &&
      currentTableRef.current.id &&
      socket.emit(LEAVE_TABLE, {
        tableId: currentTableRef.current.id,
        activeTab,
        tnRegisterName,
      });
    setJoined([]);
    if (activeTab === "cash") history.push("/");
    else if (activeTab === "tournament") history.push("/tournament");
  };

  const sitDown = (tableId, seatId, amount) => {
    socket.emit(SIT_DOWN, {
      tableId,
      seatId,
      amount,
      activeTab,
      tnRegisterName,
    });
    setIsPlayerSeated(true);
    setSeatId(seatId);
  };

  const rebuy = (tableId, seatId, amount) => {
    socket.emit(REBUY, { tableId, seatId, amount, activeTab, tnRegisterName });
  };

  const standUp = () => {
    currentTableRef &&
      currentTableRef.current &&
      socket.emit(STAND_UP, {
        tableId: currentTableRef.current.id,
        activeTab,
        tnRegisterName,
      });
    setIsPlayerSeated(false);
    setSeatId(null);
  };

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const fold = () => {
    currentTableRef &&
      currentTableRef.current &&
      socket.emit(FOLD, currentTableRef.current.id);
  };

  const check = () => {
    currentTableRef &&
      currentTableRef.current &&
      socket.emit(CHECK, currentTableRef.current.id);
  };

  const call = () => {
    currentTableRef &&
      currentTableRef.current &&
      socket.emit(CALL, currentTableRef.current.id);
  };

  const raise = (amount) => {
    currentTableRef &&
      currentTableRef.current &&
      socket.emit(RAISE, { tableId: currentTableRef.current.id, amount });
  };

  return (
    <GameContext.Provider
      value={{
        messages,
        currentTable,
        isPlayerSeated,
        seatId,
        joined,
        joinTable,
        leaveTable,
        sitDown,
        standUp,
        addMessage,
        fold,
        check,
        call,
        raise,
        rebuy,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default withRouter(GameState);
