import React from 'react';
import FileBrowser from 'react-keyed-file-browser';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Card, { CardHeader, CardActions, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';

import Directory from './Directory';

import {socket} from './../../Socket';

export default class FileExplorer extends React.Component {
  constructor() {
    super();
    this.state = {
      computer: 
      {
        type: 0, // My Computer=0, Folder/Disk=1, File=2
        name: 'My Computer',
        children: [
          {
            type: 1,
            name: 'C:',
            children: [
              { type: 2, name: 'cat.png' },
              { type: 2, name: 'dog.png' }
            ]
          },
          {
            type: 1,
            name: 'D:',
            children: [
              {
                type: 1,
                name: 'Pigeons',
                children: [
                  { type: 2, name: 'pigeon_2.png' },
                  { type: 2, name: 'pigeon_3.png' }
                ]
              },
              { type: 2, name: 'cat.png' },
              { type: 2, name: 'cat2.png' },
              { type: 2, name: 'dog1.png' },
              { type: 2, name: 'dog2.png' }
            ]
          }
        ]
      }
    };
  }

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
            <Directory data={this.state.computer} padding={14}/>
          </List>
        </CardMedia>
      </Card>
    )
  }
}