import React from 'react';
import './App.css';

import Sidebar from './features/Sidebar'
import Chat from './features/Chat'

function App() {
  return (
    <div className="app">
        <Sidebar />
        <Chat />
    </div>
  );
}

export default App;
