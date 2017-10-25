import React, { Component } from 'react';
import './App.css';

import io from 'socket.io-client';

let socket = io('http://localhost:6777');

class App extends Component {
  constructor() {
  	super();

  	this.state = {
  		clients: new Map()
  	}
  }

  componentDidMount() {
  	socket.on('clients', (clients) => clients.forEach((client) => this._clientConnected(client)));
  }

  _clientConnected(client) {
  	console.log("Client connected: " + client);
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default App;
