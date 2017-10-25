import React from "react";

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

export default class ClientList extends React.Component {
	render () {
		return (
			<List>
			{
				Array.from(this.props.clients).map(([i, c]) =>
					<ListItem button>
						<ListItemText primary={c.id} />
					</ListItem>
				)
			}
			</List>
		)
	}
}