import React from "react";

import Grid from 'material-ui/Grid';
import Dashboard from './dashboard/Dashboard';
import Process from './process/Process';

export default class PanelList extends React.Component {
  render() {
    return (
      <div>
        	<Dashboard client={this.props.client} />
          <Process />
      </div>
    );
  }
}