import React from 'react';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Card, { CardHeader, CardActions, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';

export default class FileExplorer extends React.Component {
  render() {
    return (
      <Card style={{marginBottom: 20}}>
        <CardHeader title="File Explorer" />
        <Divider />
        <CardActions>
          <Button onClick={() => {}}>Request</Button>
        </CardActions>
        <Divider />
        <CardMedia style={{maxHeight: 333, overflowY: 'auto'}}>
          <List>

          </List>
        </CardMedia>
      </Card>
    )
  }
}