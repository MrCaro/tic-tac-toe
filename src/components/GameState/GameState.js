function GameState({board, setGameOver}) {
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

  let arr = board.toArray()

  for(let i = 0; i < lines.length; i++) {
    const [cell1, cell2, cell3] = lines[i]

    if(
      arr[cell1].get("value") &&
      arr[cell1].get("value") === arr[cell2].get("value") &&
      arr[cell2].get("value") === arr[cell3].get("value")
    ) {
      isGameOver = true
      setGameOver(isGameOver)
      break
    }
  }
  
  return isGameOver ? <p>Game Over</p> : <p>Playing</p> 
}

export default GameState