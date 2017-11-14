import React from 'react';

import Map from './Map';

import Card, { CardHeader, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

export default class Dashboard extends React.Component {
  render() {
    return (
      <Card style={{marginBottom: 20}}>
        <CardHeader title="Dashboard" />
        <Divider />
        <CardMedia>
        	<Map center={{ lat: this.props.client.lat, lng: this.props.client.lng }} height={200} />
        </CardMedia>
      </Card>
    )
  }
}