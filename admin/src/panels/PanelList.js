import React from "react";

import Grid from 'material-ui/Grid';
import Dashboard from './dashboard/Dashboard';

export default class PanelList extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        	<Dashboard />
        </Grid>
      </Grid>
    );
  }
}