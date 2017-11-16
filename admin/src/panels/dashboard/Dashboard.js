import React from 'react';

import Map from './Map';

import Card, { CardHeader, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

export default class Dashboard extends React.Component {
  render() {
    return (
      <Card style={{marginBottom: 20}}>
        <CardHeader title="Dashboard" />
        <Divider />
        <CardContent>
          <table>
            <tbody>
              <tr>
                <td style={{width: 150}}>Name:</td>
                <td>{this.props.client.name}</td>
              </tr>
              <tr>
                <td>Processor:</td>
                <td>{this.props.client.processor_info}</td>
              </tr>
              <tr>
                <td>MAC:</td>
                <td>{this.props.client.mac}</td>
              </tr>
              <tr>
                <td>OS:</td>
                <td>{this.props.client.os}</td>
              </tr>
              <tr>
                <td>RAM:</td>
                <td>{this.props.client.memory}</td>
              </tr>
              <tr>
                <td>IP:</td>
                <td>{this.props.client.ip}</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
        <CardMedia>
        	<Map center={{ lat: this.props.client.lat, lng: this.props.client.lng }} height={200} />
        </CardMedia>
      </Card>
    )
  }
}