import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blue-Green Deployment Demo</h1>
        <p>This is a sample React application for demonstrating blue-green deployment.</p>
        <div className="counter">
          <p>Counter: {count}</p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
          <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
      </header>
    </div>
  );
}

export default App; 