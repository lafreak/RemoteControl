import React from 'react';

import List from 'material-ui/List';
import Card, { CardHeader, CardActions, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';

import Directory from './Directory';

import {socket} from './../../Socket';

export default class FileExplorer extends React.Component {
  constructor() {
    super();

    socket.on('files', (data) => {
      // Przykladowe dany po requescie 'C:/Program Files/WindowsDefender'
      // data = 
      /*
      {
        ClientId: '151gkeigjo43ti34i',
        OriginalPath: 'C:/Program Files/WindowsDefender',
        Files: [
          { type: 1, name: 'bin', children: [] },
          { type: 2, name: 'Defender.exe' }
        ]
      }
      */
      this.insert(data.OriginalPath, data.Files);
    });

    // Tak bedzie wygladalo drzewo przed pobraniem jakichkolwiek danych o plikach
    //this.state = {
    //  computer: {
    //    type: 0,
    //    name: 'My Computer',
    //    children: []
    //  }
    //}

    // Takie cos powstanie po moim mergu, na to nie patrz
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

    // Przykladowy insert kiedy dane przyjda
    this.insert('D:/Pigeons', [
      { type: 1, name: 'bin', children: [] },
      { type: 2, name: 'Defender.exe' }
    ]);
  }

  insert = (path, files) => {
    var node = this.findNode(path);
    if (node) {
      node.children = files;
    }
  }

  findNode = (path) => {
    var directories = path.split("/");
    var node = this.state.computer;

    directories.some(function(directory) {
      var foundChild = null;

      node.children.some(function(child) {
        if (child.name === directory) {
          foundChild = child;
          return true;
        } else {
          return false;
        }
      });

      if (foundChild === null) {
        node = null;
        return true;
      } else {
        node = foundChild;
        return false;
      }
    });

    return node;
  }

  render() {
    return (
      <Card style={{marginBottom: 20}}>
        <CardHeader title="File Explorer" subheader="Upload, download or run any file on plugged drives" style={{textAlign: 'center'}}  />
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