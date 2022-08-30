import { useEffect, useState } from 'react'
import { useOthers, useMyPresence } from "../configs/liveblocks.config";
import Cursor from '../Cursor'
import GameState from '../GameState'
import './App.css';

const COLORS = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFF176",
  "#FF8A65",
  "#F06292",
  "#7986CB",
];

function App() {
  //states from liveblocks
  const [{cursor, setCell}, updateMyPresence] = useMyPresence()
  const others = useOthers();
  //states from game
  const [currentPlayerX, setCurrentPlayerX] = useState(false)
  const [board, setBoard] = useState(
    Array.from({ length: 9 }, (x) => ({ value: null }))
  )

  const handleClickCell = (e, index) => {
    const currentPlayer = currentPlayerX ? '❌' : '⭕️'

    if(!board[index].value) {
      setBoard(
        board.map((cell, i) => (
          i === index ? { value: currentPlayer } : cell
        ))
      )
      updateMyPresence({
        setCell: 
          {
            index,
            value: currentPlayer
          }, 
      })
      setCurrentPlayerX(!currentPlayerX)
      
    }
  }

  return (
    <div 
      className="App"
      onPointerMove={(e) => {
        e.preventDefault();
        updateMyPresence({
          cursor: {
            x: Math.round(e.clientX),
            y: Math.round(e.clientY),
          },
        });
      }}
      onPointerLeave={() =>
        updateMyPresence({
          cursor: null,
        })
      }
    >
      <div className="game-bg"></div>
      <div className="game-wrapper">
        <div className="game-info">
          <GameState board={board} />
          <h1>Let's play Tic Tac Toe</h1>
          <p>
            { 
              others.count >= 1 
                ? `players: ${others.count}` 
                : 'you are the only player connected'
            }
          </p>
          <p className="game--info-cursor">
            {
              cursor
                ? `${cursor.x} × ${cursor.y}`
                : "Move your cursor to share your location with other users in the app"
            }
          </p>
        </div>
        <div>
        <div className="board-wrapper">
          {
            board.map((cell, i) => (
              <Cell 
                {...cell}
                key={i} 
                onClick={(e) => handleClickCell(e, i)} 
              />
            ))
          }
        </div>
          {
            others.map(({ connectionId, presence }) => {
              if (presence == null || presence.setCell == null) {
                return null;
              }

              return <p key={connectionId}>remote user played {presence.setCell.value}</p>
            })
          }
        </div>
        {        
          others.map(({ connectionId, presence }) => {
            if (presence == null || presence.cursor == null) {
              return null;
            }

            return (
              <Cursor
                // connectionId is an integer that is incremented at every new connections
                key={`cursor-${connectionId}`}
                // Assigning a color with a modulo makes sure that a specific user has the same colors on every clients
                color={COLORS[connectionId % COLORS.length]}
                x={presence.cursor.x}
                y={presence.cursor.y}
              />
            );
          })
        }
      </div>
    </div>
  );
}

function Cell({ value, onClick }) {
  return (
    <button className={`board-cell ${value ? 'board-cell--active' : 'board-cell--inactive'}`} onClick={onClick}>
      <span role="img" aria-label="tic tac toe player move">{value}</span>
    </button>
  )
}

export default App;
