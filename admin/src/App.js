import React, { Component } from 'react';
import './App.css';

import Drawer from 'material-ui/Drawer';

import ClientList from './clients/ClientList';

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
    socket.on('client_connected', (client) => this._clientConnected(client));
    socket.on('client_disconnected', (client) => this._clientDisconnected(client));
  }

  _clientConnected(client) {
  	console.log("Client connected: " + client.id);
  	var {clients} = this.state;
  	clients.set(client.id, client);
  	this.setState({clients});
  }

  _clientDisconnected(client) {
    console.log("Client disconnected: " + client.id);
    var {clients} = this.state;
    clients.delete(client.id);
    this.setState({clients});
  }

  render() {
    return (
    	<div>
    		<Drawer type="permanent">
    			<ClientList clients={this.state.clients} />
    		</Drawer>
    	</div>
    );
  }
}

export default App;
