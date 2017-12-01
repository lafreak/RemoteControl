import React from 'react';

import List from 'material-ui/List';
import Card, { CardHeader, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import Directory from './Directory';

import {socket} from './../../Socket';

export default class FileExplorer extends React.Component {
  componentDidMount() {
    // Tak bedzie wygladalo drzewo przed pobraniem jakichkolwiek danych o plikach
    //this.state = {
    //  computer: {
    //    type: 0,
    //    fullPath: 'PC',
    //    name: 'My Computer',
    //    children: []
    //  }
    //}
  }

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
          { type: 1, fullPath: 'C:/Program Files/WindowsDefender/bin', name: 'bin', children: [] },
          { type: 2, fullPath: 'C:/Program Files/WindowsDefender/Defender.exe', name: 'Defender.exe' }
        ]
      }
      */
      console.log(data);
      this.insert(data.OriginalPath, data.Files);
    });

    // Tak bedzie wygladalo drzewo przed pobraniem jakichkolwiek danych o plikach
    //this.state = {
    //  computer: {
    //    type: 0,
    //    fullPath: 'PC',
    //    name: 'My Computer',
    //    children: []
    //  }
    //}

    // Takie cos powstanie po moim mergu, na to nie patrz
    this.state = {
      computer: 
      {
        type: 0, // My Computer=0, Folder/Disk=1, File=2
        fullPath: 'PC',
        name: 'My Computer',
        children: [
          {
            type: 1,
            fullPath: 'C:',
            name: 'C:',
            children: [
              { type: 2, fullPath: 'C:/cat.png', name: 'cat.png' },
              { type: 2, fullPath: 'C:/dog.png',name: 'dog.png' }
            ]
          },
          {
            type: 1,
            fullPath: 'D:',
            name: 'D:',
            children: [
              {
                type: 1,
                fullPath: 'D:/Pigeons',
                name: 'Pigeons',
                children: [
                  { type: 2, fullPath: 'D:/Pigeons/pigeon_2.png', name: 'pigeon_2.png' },
                  { type: 2, fullPath: 'D:/Pigeons/pigeon_3.png', name: 'pigeon_3.png' }
                ]
              },
              { type: 2, fullPath: 'D:/cat.png', name: 'cat.png' },
              { type: 2, fullPath: 'D:/cat2.png', name: 'cat2.png' },
              { type: 2, fullPath: 'D:/dog1.png', name: 'dog1.png' },
              { type: 2, fullPath: 'D:/dog2.png', name: 'dog2.png' }
            ]
          }
        ]
      }
    };

    // Przykladowy insert kiedy dane przyjda
    this.insert('D:/Pigeons', [
      { type: 1, fullPath: 'D:/Pigeons/bin', name: 'bin', children: [] },
      { type: 2, fullPath: 'D:/Pigeons/Defender.exe', name: 'Defender.exe' }
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