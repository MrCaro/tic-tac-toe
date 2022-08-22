import { useState } from 'react'
import { useOthers, useUpdateMyPresence } from "../configs/liveblocks.config";
import Cursor from '../Cursor'
import GameState from '../GameState'
import './App.css';

function App() {
  const updateMyPresence = useUpdateMyPresence();
  const others = useOthers();

  const [currentPlayerX, setCurrentPlayerX] = useState(false)
  const [board, setBoard] = useState(
    Array.from({ length: 9 }, (x) => ({ value: null }))
  )
  
  const handleClickCell = (e, index) => {
    const currentPlayer = currentPlayerX ? '❌' : '⭕️'
    updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })

    if(!board[index].value) {
      setBoard(
        board.map((cell, i) => (
          i === index ? { value: currentPlayer } : cell
        ))
      )
      setCurrentPlayerX(!currentPlayerX)
    }
  }

  return (
    <div className="App">
      <GameState board={board} />
      <h1>Tic Tac Toe</h1>
      <div className="board-wrapper">
        {board.map((cell, i) => (
          <Cell 
            {...cell}
            key={i} 
            onClick={(e) => handleClickCell(e, i)} 
          />
        )
        )}
      </div>
      {/* liveblocks */}
      <div>There are {others.count} other users with you in the room.</div>
      {others.map((user) => {
          if (user.presence?.cursor == null) {
            console.log('user is null dude')
            return null;
          }
          return <Cursor key={user.connectionId} cursor={user.presence.cursor} />;
      })}
    </div>
  );
}

function Cell({ value, onClick }) {
  return (
    <button className="board-cell"  onClick={onClick}>
      <span role="img" aria-label="tic tac toe player move">{value}</span>
    </button>
  )
}

export default App;
