import React from 'react';

import List, { ListItem, ListItemText } from 'material-ui/List';
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
          <List>
            {
              this.props.data.map((p) =>
                <ListItem button dense
                  button
                  key={p.Id}
                  onClick={() => this.props.onProcessKillRequest(p.Id)}>
                  <ListItemText 
                    primary={p.Name}
                    secondary={parseInt(p.Memory / 1024 / 1024, 10) + 'MB'} />
                </ListItem>
              )
            }
            </List>
        </CardContent>
      </Card>
    )
  }
}