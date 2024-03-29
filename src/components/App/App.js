import { useEffect, useState } from 'react'
import { useOthers, useMyPresence, useList, useObject } from "../configs/liveblocks.config";
import './App.css';
import Cursor from '../Cursor'
import GameState from '../GameState'

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
  const [{cursor}, updateMyPresence] = useMyPresence()
  const [setCell, setMyPresence] = useMyPresence()
  const [{isCurrentPlayerX}, updateMyPresenceX] = useMyPresence()
  const others = useOthers();
  //states from game
  const [currentPlayerX, setCurrentPlayerX] = useState(false)
  const [isGameOver, setGameOver] = useState(false)

  const liveBoard = useList("cells")
  const playerX = useObject("playerX")

  if(!liveBoard) {
    return(
      <p>loading game...</p>
    )
  }

  // deletes liveblocks room data
  //TODO: currently present CORS error policy
 

  const handleClickCell = (e, index) => {
    const currentPlayer = playerX.get("value") ? '❌' : '⭕️'
    const arr = liveBoard.toArray()

    if(!arr[index].get("value")) {
        liveBoard.map((cell, i) => (
          i === index ? cell.set("value", currentPlayer) : cell
        ))
      // setCurrentPlayerX(!currentPlayerX)
      playerX.set('value', !playerX.get("value"))
    }
  }

  const resetGame = (e) => {
    liveBoard.map((cell, i) => (
      cell.set("value", null)
    ))
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
          cursor: {
            x: 50,
            y: 50,
          },
        })
      }
    >
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
      <div className="game-bg"></div>
        <div className="game-wrapper">
          <div className="game-info">
            <GameState board={liveBoard} setGameOver={setGameOver} /> 
            <h1>Tic Tac Toe</h1>
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
            <button onClick={(e) => resetGame(e)}>
              reset
            </button>
          </div>
        <div>
        <div className={`board-wrapper ${isGameOver ? 'board-wrapper--disabled' : ''}`}>
          {
            liveBoard.map((cell, i) => (
              <Cell 
                {...cell}
                key={i}
                value={cell.get("value")}
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
