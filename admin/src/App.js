import React, { Component } from 'react';
import './App.css';

import io from 'socket.io-client';

let socket = io('http://localhost:6777');

class App extends Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default App;
