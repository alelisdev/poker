class Player {
  constructor(socketId, playerId, playerName, chipsAmount, balance) {
    this.socketId = socketId;
    this.id = playerId;
    this.name = playerName;
    this.chipsAmount = chipsAmount;
    this.balance = balance;
  }
}

module.exports = Player;
