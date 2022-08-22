import { useState } from 'react'
import { useOthers, useUpdateMyPresence } from "../configs/liveblocks.config";
import Cursor from '../Cursor'
import GameState from '../GameState'
import './App.css';

function App() {
  const updateMyPresence = useUpdateMyPresence();
  const others = useOthers();
  const othersCursors = others.map((user) => user.presence?.cursor);

  const [currentPlayerX, setCurrentPlayerX] = useState(false)
  const [board, setBoard] = useState(
    Array.from({ length: 9 }, (x) => ({ value: null }))
  )
  
  const handleClickCell = (index) => {
    const currentPlayer = currentPlayerX ? '❌' : '⭕️'

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
            onClick={() => handleClickCell(i)} 
          />
        )
        )}
      </div>
      {/* liveblocks */}
      <div>There are {others.count} other users with you in the room.</div>
      <div
        style={{ width: "100vw", height: "100vh" }}
        onPointerMove={(e) =>
          updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
        }
      />
      {othersCursors.map((cursor) => (
        console.log('cursor ->', cursor),
        <Cursor x={cursor.x} y={cursor.y} />
      ))}
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
