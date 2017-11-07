import React, { Component } from 'react';
import './App.css';

import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';

import ClientList from './clients/ClientList';
import PanelList from './panels/PanelList'

import io from 'socket.io-client';

let socket = io('http://localhost:6777');

class App extends Component {
  constructor() {
  	super();

  	this.state = {
  		clients: new Map(),
      dashboard: { id: 2 }
  	}
  }

  componentDidMount() {
    socket.on('disconnect', () => this.setState({clients: new Map()}))
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
    	<Grid container>
        <Grid item xl={2} lg={2} md={12} sm={12} xs={12}>
      		<Drawer type="permanent">
      			<ClientList clients={this.state.clients} />
      		</Drawer>
        </Grid>
        <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
          <PanelList dashboard={this.state.dashboard} />
        </Grid>
        <Grid item xl={2} lg={2}>
        </Grid>
    	</Grid>
    );
  }
}

export default App;
