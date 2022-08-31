import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../src/components/App';
import { LiveList, LiveObject } from '@liveblocks/client';
import { RoomProvider } from "../src/components/configs/liveblocks.config.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoomProvider 
      id="tic-tac-toe-room" 
      initialPresence={{ 
        cursor: null,
        selectedCell: null
      }}
      initialStorage={{
        cells: new LiveList([
          new LiveObject({ value: 'lorem' }),
          new LiveObject({ value: 'lorem' }),
          new LiveObject({ value: 'lorem' }),
          new LiveObject({ value: 'lorem' }),
          new LiveObject({ value: 'lorem' }),
          new LiveObject({ value: 'lorem' }),
          new LiveObject({ value: 'lorem' }),
          new LiveObject({ value: 'lorem' }),
          new LiveObject({ value: 'lorem' }),
        ]),
      }}
    >
      <App />
    </RoomProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
