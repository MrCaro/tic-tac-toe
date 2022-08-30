function GameState({board}) {
  let isGameOver = false
  let lines = [
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal
    [0, 4, 8],
    [2, 4, 6]
  ]

  for(let i = 0; i < lines.length; i++) {
    const [cell1, cell2, cell3] = lines[i]

    if(
      board[cell1].value &&
      board[cell1].value === board[cell2].value &&
      board[cell2].value === board[cell3].value
    ) {
      isGameOver = true
      break
    }
  }
  
  return isGameOver ? <p>Game Over</p> : <p>Playing</p>
}

export default GameState