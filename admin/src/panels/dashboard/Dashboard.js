import React from 'react';

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

        </CardMedia>
      </Card>
    )
  }
}