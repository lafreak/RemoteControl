import React from "react";

import List, { ListItem, ListItemText } from 'material-ui/List';

export default class ClientList extends React.Component {
	render () {
		return (
			<List>
			{
				Array.from(this.props.clients).map(([i, c]) =>
					<ListItem 
						button
						onClick={() => this.props.onClientChange(c.id)}>
						<ListItemText primary={c.id} />
					</ListItem>
				)
			}
			</List>
		)
	}
}