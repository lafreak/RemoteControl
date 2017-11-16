import React from "react";

import Grid from 'material-ui/Grid';
import Dashboard from './dashboard/Dashboard';
import ProcessExplorer from './process/ProcessExplorer';

export default class PanelList extends React.Component {
  render() {
    return (
      <div>
        	<Dashboard client={this.props.client} />
          <ProcessExplorer 
            data={this.props.process}
            onProcessRequest={this.props.onProcessRequest}
            onProcessKillRequest={this.props.onProcessKillRequest} />
      </div>
    );
  }
}