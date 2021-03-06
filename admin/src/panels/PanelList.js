import React from "react";

import Dashboard from './dashboard/Dashboard';
import ProcessExplorer from './process/ProcessExplorer';
import FileExplorer from './files/FileExplorer';
import Stream from './streaming/Stream';
import Grid from 'material-ui/Grid';

export default class PanelList extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
        	<Dashboard client={this.props.client} />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Stream />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <ProcessExplorer 
              data={this.props.process}
              onProcessRequest={this.props.onProcessRequest}
              onProcessKillRequest={this.props.onProcessKillRequest} />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <FileExplorer />
        </Grid>
      </Grid>
    );
  }
}