import React from 'react';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Card, { CardHeader, CardActions, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class ProcessExplorer extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      process: {Id: null, Name: null}
    };
  }

  handleClickOpen(process) {
    this.setState({open: true, process});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  handleRequestKill = () => {
    this.props.onProcessKillRequest(this.state.process.Id);
    this.setState({open: false});
  };

  render() {
    return (
      <div>
        <Card style={{marginBottom: 20}}>
          <CardHeader title="Process Explorer" subheader="Search and kill any running process" style={{textAlign: 'center'}}  />
          <Divider />
          <CardActions>
            <Button onClick={() => this.props.onProcessRequest()}>Request</Button>
          </CardActions>
          <Divider />
          <CardMedia style={{height: 333, overflowY: 'auto'}}>
            <List>
              {
                this.props.data.map((p) =>
                  <ListItem button dense
                    key={p.Id}
                    onClick={() => this.handleClickOpen(p)}>
                    <ListItemText 
                      primary={p.Name}
                      secondary={'RAM: ' + parseInt(p.WorkingSet64 / 1024 / 1024, 10) + 'MB, Threads: ' + p.ThreadsCount} />
                  </ListItem>
                )
              }
              </List>
          </CardMedia>
        </Card>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>Do you want to end {this.state.process.Name}?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              If an open program is associated with this process, it will
              close and you will lose any unsaved data. If you end a system
              process, it might result in system instability. 
              Are you sure you want to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="accent">
              Cancel
            </Button>
            <Button onClick={this.handleRequestKill} color="primary" autoFocus>
              End process
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}