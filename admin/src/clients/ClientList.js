import React from "react";

import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export default class ClientList extends React.Component {
	render () {
		return (
			<List>
			{
				Array.from(this.props.clients).map(([i, c]) =>
					<ListItem 
						button
						key={c.id}
						style={c.id === this.props.selectedId ? {backgroundColor: '#E0E0E0'} : null}
						onClick={() => this.props.onClientChange(c.id)}>
						<Avatar>{c.id.charAt(0)}</Avatar>
						<ListItemText primary={c.id} />
					</ListItem>
				)
			}
			</List>
		)
	}
}