import React from 'react';

import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';

export default class ProcessExplorer extends React.Component {
  render() {
    return (
      <Card style={{marginBottom: 20}}>
        <CardHeader title="Process Explorer" />
        <Divider />
        <CardActions>
          <Button onClick={() => this.props.onProcessRequest()}>Request</Button>
        </CardActions>
        <Divider />
        <CardContent>
        </CardContent>
      </Card>
    )
  }
}