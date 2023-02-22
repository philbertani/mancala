
export const demoPlayer = {

    heartbeat: 1676482854701,
    loggedIn: false,
    activeGameId: "splashPage",
    opponent: "lucy",
    challengeStatus: "accepted",
    playStatus: "playing",
    playerNum: 1,
    myBins: [8, 13],
    anotherTurn: false,
    playingSelf: true,
    activeGame: {
      id: "splashPage",
      time: 1676482127567,
      playerName: "lucy",
      opponentName: "lucy",
      boardConfig: {
        nextBin: [
          [8, 0, 1, 2, 3, 4, 5, -1, 9, 10, 11, 12, 13, 6],
          [-1, 8, 1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 7],
        ],
        stones: [0, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3],
        homeBase: [0, 7],
        playerBins: [
          [1, 6],
          [8, 13],
        ],
      },
      players: ["lucy", "lucy"],
      currentPlayerNum: 0,
      moves: [],
      gameState: "playing",
      display: true,
      winnerInfo: "",
    },
    disconnected: false,
    opponentDisconnected: false,
    myTurn: true,
    currentPlayer: "lucy",
  
}
