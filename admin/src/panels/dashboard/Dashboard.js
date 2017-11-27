import React from 'react';

import Map from './Map';

import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Card, { CardHeader, CardContent, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

export default class Dashboard extends React.Component {
  render() {
    return (
      <Card style={{marginBottom: 20}}>
        <CardHeader title="Dashboard" />
        <Divider />
        <CardMedia>
          <Table style={{width: '100%'}}>
            <TableBody>
              <TableRow style={{height: 10}}>
                <TableCell>Name</TableCell>
                <TableCell>{this.props.client.name}</TableCell>
              </TableRow>
              <TableRow style={{height: 10}}>
                <TableCell>Processor</TableCell>
                <TableCell>{this.props.client.processor_info}</TableCell>
              </TableRow>
              <TableRow style={{height: 10}}>
                <TableCell>MAC Address</TableCell>
                <TableCell>{this.props.client.mac}</TableCell>
              </TableRow>
              <TableRow style={{height: 10}}>
                <TableCell>Operating System</TableCell>
                <TableCell>{this.props.client.os}</TableCell>
              </TableRow>
              <TableRow style={{height: 10}}>
                <TableCell>RAM Memory</TableCell>
                <TableCell>{this.props.client.memory}</TableCell>
              </TableRow>
              <TableRow style={{height: 10}}>
                <TableCell>IP Address</TableCell>
                <TableCell>{this.props.client.ip}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardMedia>
        <CardMedia>
        	<Map center={{ lat: this.props.client.lat, lng: this.props.client.lng }} height={200} />
        </CardMedia>
      </Card>
    )
  }
}