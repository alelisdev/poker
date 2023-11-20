const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Table = require("../pokergame/Table");
const Player = require("../pokergame/Player");
const moment = require("moment");
const {
  FETCH_LOBBY_INFO,
  RECEIVE_LOBBY_INFO,
  PLAYERS_UPDATED,
  CREATE_TABLE,
  JOIN_TABLE,
  TABLE_JOINED,
  TABLES_UPDATED,
  LEAVE_TABLE,
  TABLE_LEFT,
  FOLD,
  CHECK,
  CALL,
  RAISE,
  TABLE_MESSAGE,
  SIT_DOWN,
  REBUY,
  STAND_UP,
  SITTING_OUT,
  SITTING_IN,
  DISCONNECT,
  TABLE_UPDATED,
  WINNER,
} = require("../pokergame/actions");
const config = require("../config");

const monday = moment().startOf("isoWeek").format("YYYY-MM-DD HH:mm:ss");

const tables = {
  1: new Table(1, "Table 1", 100),
  2: new Table(2, "Table 2", 100),
  3: new Table(3, "Table 3", 100),
  4: new Table(4, "Table 4", 100),
  5: new Table(5, "Table 5", 100),
  6: new Table(6, "Table 6", 100),
  7: new Table(7, "Table 7", 100),
  8: new Table(8, "Table 8", 100),
  9: new Table(9, "Table 9", 100),
  10: new Table(10, "Table 10", 100),
  11: new Table(11, "Table 11", 100),
  12: new Table(12, "Table 12", 100),
  13: new Table(13, "Table 13", 100),
  14: new Table(14, "Table 14", 100),
  15: new Table(15, "Table 15", 100),
  16: new Table(16, "Tournament 1", 10000),
  17: new Table(17, "Tournament 2", 10000),
  18: new Table(18, "Tournament 3", 10000),
  19: new Table(19, "Tournament 4", 10000),
  20: new Table(20, "Tournament 5", 10000),
  21: new Table(21, "Tournament 6", 10000),
  22: new Table(22, "Tournament 7", 10000),
  23: new Table(23, "Tournament 8", 10000),
  24: new Table(24, "Tournament 9", 10000),
  25: new Table(25, "Tournament 10", 1000),
};

const players = {};

function getCurrentPlayers() {
  return Object.values(players).map((player) => ({
    socketId: player.socketId,
    id: player.id,
    name: player.name,
  }));
}

function getCurrentTables() {
  const fetchedTables = Object.values(tables).map((table) => ({
    id: table.id,
    name: table.name,
    limit: table.limit,
    players: table.players,
    maxPlayers: table.maxPlayers,
    currentNumberPlayers: table.players.length,
    smallBlind: table.minBet,
    bigBlind: table.minBet * 2,
    registers: table.registers,
    start: table.start,
  }));
  const result = [];
  fetchedTables.filter((table, id) => {
    // if (table.players) result.push(table);
    result.push(table);
  });
  return result;
}

const init = (socket, io) => {
  socket.on(FETCH_LOBBY_INFO, async (token) => {
    let user;
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) console.log(err);
      else {
        user = decoded.user;
      }
    });

    if (user) {
      const found = Object.values(players).find((player) => {
        return player.id == user.id;
      });

      if (found) {
        delete players[found.socketId];
        Object.values(tables).map((table) => {
          table.removePlayer(found.socketId);
          broadcastToTable(table);
        });
      }

      user = await User.findById(user.id).select("-password");
      const coinType = "ETH";
      const balanceData = user.balance.data.find(
        (data) => data.coinType === coinType
      );
      players[socket.id] = new Player(
        socket.id,
        user._id,
        user.name,
        user.chipsAmount,
        balanceData.balance
      );
      const data = {
        tables: getCurrentTables(),
        players: getCurrentPlayers(),
        socketId: socket.id,
      };
      socket.emit(RECEIVE_LOBBY_INFO, data);
      socket.broadcast.emit(PLAYERS_UPDATED, getCurrentPlayers());
    }
  });

  socket.on(CREATE_TABLE, () => {
    const tableId = Object.values(tables).length + 1;
    tables[tableId] = new Table(tableId, `Table ${tableId}`, 0.1);
    const player = players[socket.id];
    if (player) tables[tableId].addPlayer(player);
    socket.emit(TABLE_JOINED, { tables: getCurrentTables(), tableId });
    socket.broadcast.emit(TABLES_UPDATED, getCurrentTables());
    if (
      tables[tableId].players &&
      tables[tableId].players.length > 0 &&
      player
    ) {
      let message = `${player.name} joined the table.`;
      broadcastToTable(tables[tableId], message);
    }
  });

  socket.on(JOIN_TABLE, (tableId) => {
    const table = tables[tableId];
    if (table) {
      const player = players[socket.id];
      table.addPlayer(player);
      socket.emit(TABLE_JOINED, { tables: getCurrentTables(), tableId });
      socket.broadcast.emit(TABLES_UPDATED, getCurrentTables());

      if (
        tables[tableId].players &&
        tables[tableId].players.length > 0 &&
        player
      ) {
        let message = `${player.name} joined the table.`;
        broadcastToTable(table, message);
      }
    }
  });

  socket.on(LEAVE_TABLE, ({ tableId, activeTab }) => {
    const table = tables[tableId];
    if (table) {
      const player = players[socket.id];
      const seat = Object.values(table.seats).find(
        (seat) => seat && seat.player.socketId === socket.id
      );
      if (seat && player) {
        updatePlayerBankroll(player, seat.stack, activeTab);
      }

      table.removePlayer(socket.id);

      socket.broadcast.emit(TABLES_UPDATED, getCurrentTables());
      socket.emit(TABLE_LEFT, { tables: getCurrentTables(), tableId });

      if (
        tables[tableId].players &&
        tables[tableId].players.length > 0 &&
        player
      ) {
        let message = `${player.name} left the table.`;
        broadcastToTable(table, message);
      }

      if (table.activePlayers().length === 1) {
        clearForOnePlayer(table);
      }
    }
  });

  socket.on(FOLD, (tableId) => {
    let table = tables[tableId];
    if (table) {
      let res = table.handleFold(socket.id);
      res && broadcastToTable(table, res.message);
      res && changeTurnAndBroadcast(table, res.seatId);
    }
  });

  socket.on(CHECK, (tableId) => {
    let table = tables[tableId];
    let res = table.handleCheck(socket.id);
    res && broadcastToTable(table, res.message);
    res && changeTurnAndBroadcast(table, res.seatId);
  });

  socket.on(CALL, (tableId) => {
    let table = tables[tableId];
    let res = table.handleCall(socket.id);
    res && broadcastToTable(table, res.message);
    res && changeTurnAndBroadcast(table, res.seatId);
  });

  socket.on(RAISE, ({ tableId, amount }) => {
    let table = tables[tableId];
    let res = table.handleRaise(socket.id, amount);
    res && broadcastToTable(table, res.message);
    res && changeTurnAndBroadcast(table, res.seatId);
  });

  socket.on(TABLE_MESSAGE, ({ message, from, tableId }) => {
    let table = tables[tableId];
    broadcastToTable(table, message, from);
  });

  socket.on(SIT_DOWN, ({ tableId, seatId, amount, activeTab }) => {
    const table = tables[tableId];
    const player = players[socket.id];

    if (player) {
      table.sitPlayer(player, seatId, amount);
      let message = `${player.name} sat down in Seat ${seatId}`;
      updatePlayerBankroll(player, -amount, activeTab);
      broadcastToTable(table, message);
      if (table.activePlayers().length === 2) {
        initNewHand(table);
      }
    }
  });

  socket.on(REBUY, ({ tableId, seatId, amount, activeTab }) => {
    const table = tables[tableId];
    const player = players[socket.id];

    table.rebuyPlayer(seatId, amount);
    updatePlayerBankroll(player, -amount, activeTab);

    broadcastToTable(table);
  });

  socket.on(STAND_UP, ({ tableId, activeTab }) => {
    const table = tables[tableId];
    if (table) {
      const player = players[socket.id];
      const seat = Object.values(table.seats).find(
        (seat) => seat && seat.player.socketId === socket.id
      );

      let message = "";
      if (seat) {
        updatePlayerBankroll(player, seat.stack, activeTab);
        message = `${player.name} left the table`;
      }

      table.standPlayer(socket.id);

      broadcastToTable(table, message);
      if (table.activePlayers().length === 1) {
        clearForOnePlayer(table);
      }
    }
  });

  socket.on(SITTING_OUT, ({ tableId, seatId }) => {
    const table = tables[tableId];
    const seat = table.seats[seatId];
    seat.sittingOut = true;

    broadcastToTable(table);
  });

  socket.on(SITTING_IN, ({ tableId, seatId }) => {
    const table = tables[tableId];
    const seat = table.seats[seatId];
    seat.sittingOut = false;

    broadcastToTable(table);
    if (table.handOver && table.activePlayers().length === 2) {
      initNewHand(table);
    }
  });

  socket.on(DISCONNECT, (activeTab) => {
    const seat = findSeatBySocketId(socket.id);
    if (seat) {
      updatePlayerBankroll(seat.player, seat.stack, activeTab);
    }

    delete players[socket.id];
    removeFromTables(socket.id);

    socket.broadcast.emit(TABLES_UPDATED, getCurrentTables());
    socket.broadcast.emit(PLAYERS_UPDATED, getCurrentPlayers());
  });

  async function updatePlayerBankroll(player, amount, activeTab) {
    const ethPrice = 2023.84;

    try {
      const user = await User.findById(player.id);
      if (activeTab === "cash") {
        const coinType = "ETH";
        let balanceData = user.balance.data.find(
          (data) => data.coinType === coinType
        );
        balanceData.balance += Number(amount / ethPrice);
        const newBalance = user.balance.data.map((bal) => {
          if (bal.coinType === coinType) return balanceData;
          else return bal;
        });
        await User.findOneAndUpdate(
          { _id: player.id },
          { balance: { data: newBalance } }
        );
        await user.save();
        players[socket.id].balance += amount / ethPrice;
      } else if (activeTab === "tournament") {
        user.chipsAmount += amount;
        await user.save();
        players[socket.id].chipsAmount += amount;
      }
      io.to(socket.id).emit(PLAYERS_UPDATED, getCurrentPlayers());
    } catch (error) {
      console.log("update bankroll", error);
    }
  }

  function findSeatBySocketId(socketId) {
    let foundSeat = null;
    Object.values(tables).forEach((table) => {
      Object.values(table.seats).forEach((seat) => {
        if (seat && seat.player.socketId === socketId) {
          foundSeat = seat;
        }
      });
    });
    return foundSeat;
  }

  function removeFromTables(socketId) {
    for (let i = 0; i < Object.keys(tables).length; i++) {
      tables[Object.keys(tables)[i]].removePlayer(socketId);
    }
  }

  function broadcastToTable(table, message = null, from = null) {
    for (let i = 0; i < table.players.length; i++) {
      let socketId = table.players[i]?.socketId;
      let tableCopy = hideOpponentCards(table, socketId);
      io.to(socketId).emit(TABLE_UPDATED, {
        table: tableCopy,
        message,
        from,
      });
    }
  }

  function changeTurnAndBroadcast(table, seatId) {
    setTimeout(() => {
      table.changeTurn(seatId);
      broadcastToTable(table);

      if (table.handOver) {
        initNewHand(table);
      }
    }, 1000);
  }

  function initNewHand(table) {
    if (table.activePlayers().length > 1) {
      broadcastToTable(table, "New hand starting in 5 seconds");
    }
    setTimeout(() => {
      table.clearWinMessages();
      table.startHand();
      broadcastToTable(table, "New hand started");
    }, 5000);
  }

  function clearForOnePlayer(table) {
    table.clearWinMessages();
    setTimeout(() => {
      table.clearSeatHands();
      table.resetBoardAndPot();
      broadcastToTable(table, "Waiting for more players");
    }, 5000);
  }

  function hideOpponentCards(table, socketId) {
    let tableCopy = JSON.parse(JSON.stringify(table));
    let hiddenCard = { suit: "hidden", rank: "hidden" };
    let hiddenHand = [hiddenCard, hiddenCard];

    for (let i = 1; i <= tableCopy.maxPlayers; i++) {
      let seat = tableCopy.seats[i];
      if (
        seat &&
        seat.hand.length > 0 &&
        seat.player.socketId !== socketId &&
        !(seat.lastAction === WINNER && tableCopy.wentToShowdown)
      ) {
        seat.hand = hiddenHand;
      }
    }
    return tableCopy;
  }
};

module.exports = { init };
