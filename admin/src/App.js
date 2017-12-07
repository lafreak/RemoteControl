import React, { Component } from 'react';
import './App.css';

import Grid from 'material-ui/Grid';

import ClientList from './clients/ClientList';
import PanelList from './panels/PanelList'

import axios from 'axios';

//import io from 'socket.io-client';
//let socket = io('http://localhost:6777');

import {socket} from './Socket';
import {_globals} from './Globals';

class App extends Component {
  constructor() {
  	super();

  	this.state = {
      clients: new Map()
  	}

    this.handleClientChange = this.handleClientChange.bind(this);
    this.handleProcessRequest = this.handleProcessRequest.bind(this);
    this.handleProcessKillRequest = this.handleProcessKillRequest.bind(this);
  }

  componentDidMount() {
    socket.on('disconnect', () => this.setState({clients: new Map()}))
  	socket.on('clients', (clients) => clients.forEach((client) => this._clientConnected(client)));
    socket.on('client_connected', (client) => this._clientConnected(client));
    socket.on('client_disconnected', (client) => this._clientDisconnected(client));
    socket.on('processes', (data) => this._processes(data));
  }

  _clientConnected(client) {
    this.handleFreegeoip(client, () => {
      var {clients} = this.state;
      clients.set(client.id, client);
      this.setState({clients});
    });
  }

  _clientDisconnected(client) {
    var {clients, selectedClient} = this.state;

    if (this.state.selectedClient && this.state.selectedClient.id === client.id)
      selectedClient = null;

    console.log("Client disconnected: " + client.id);
    
    clients.delete(client.id);
    this.setState({clients, selectedClient});
  }

  _processes(data) {
    if (this.state.selectedClient && data.id !== this.state.selectedClient.id)
      return;
    
    this.setState({process: data.list});
  }

  handleFreegeoip(client, callback) {
    axios.get(`https://freegeoip.net/json/${client.ip}`)
    .then(res => {
      client.lat = res.data.latitude;
      client.lng = res.data.longitude;
    }).catch(res => {
      client.lat = 0;
      client.lng = 0;
    }).then(() => callback());
  }

  // Process
  handleProcessRequest() {
    socket.emit('processes', { id: this.state.selectedClient.id });
  }
  handleProcessKillRequest(id) {
    socket.emit('kill_process', { id: this.state.selectedClient.id, processId: id});
  }

  handleClientChange(id) {
    _globals.selectedId = id;

    var {clients, selectedClient} = this.state;

    if (selectedClient) {
      if (id === selectedClient.id) return;
    }

    selectedClient = clients.get(id);

    this.setState({
      selectedClient,
      process: []
    });

    socket.emit('processes', { id });
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xl={2} lg={2} md={12} sm={12} xs={12}>
            <ClientList 
              clients={this.state.clients}
              selectedId={this.state.selectedClient ? this.state.selectedClient.id : ""}
              onClientChange={this.handleClientChange} />
          </Grid>
          
          <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
          {
            this.state.selectedClient &&
            <PanelList 
              // Dashboard
              client={this.state.selectedClient}

              // Process
              process={this.state.process} 
              onProcessRequest={this.handleProcessRequest}
              onProcessKillRequest={this.handleProcessKillRequest} />
          }
          </Grid>
          <Grid item xl={2} lg={2}>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
