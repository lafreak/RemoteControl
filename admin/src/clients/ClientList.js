import React from "react";

import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

export default class ClientList extends React.Component {
	render () {
		return (
			<Card style={{marginBottom: 20}}>
				<CardHeader title="Clients" />
				<Divider />
				<CardMedia>
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
				</CardMedia>
			</Card>
		)
	}
}