import React from 'react';

import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

export default class Dashboard extends React.Component {
  render() {
    return (
      <Card style={{marginBottom: 20}}>
        <CardHeader title="Process" />
        <Divider />
        <CardContent>
          Process
        </CardContent>
      </Card>
    )
  }
}