import React from 'react';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import FolderIcon from 'material-ui-icons/Folder';
import FolderOpenIcon from 'material-ui-icons/FolderOpen';
import InsertDriveFileIcon from 'material-ui-icons/InsertDriveFile';
import ComputerIcon from 'material-ui-icons/Computer';

export default class Directory extends React.Component {
  state = {open: false};

  handleClick = () => {
    this.setState({open: !this.state.open});
  };

  icon = (type) => {
    switch (type) {
      case 0: return <ComputerIcon />;
      case 1: if (!this.state.open) return <FolderIcon />; else return <FolderOpenIcon />;
      case 2: default: return <InsertDriveFileIcon />;
    }
  }

  render() {
    return (
      <div>
        <ListItem key={this.props.data.name} button onClick={this.handleClick} style={{paddingLeft: this.props.padding}}>
          <ListItemIcon>
            {this.icon(this.props.data.type)}
          </ListItemIcon>
          <ListItemText inset primary={this.props.data.name} />
          {this.props.data.type !== 2 && (this.state.open ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {
          this.props.data.type !== 2 &&
          <Collapse component="li" in={this.state.open} transitionDuration="auto" unmountOnExit>
            <List disablePadding>
              { this.props.data.children.map((directory, _) => <Directory data={directory} padding={this.props.padding+10}/>) }
            </List>
          </Collapse>
        }
      </div>
    );
  }
}