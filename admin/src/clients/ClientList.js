import React from "react";

import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

export default class ClientList extends React.Component {
	render () {
		return (
			<Card style={{marginBottom: 20}}>
				<CardHeader title="Clients" subheader="Connected users" style={{textAlign: 'center'}} />
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
								<Avatar>{c.name.charAt(0)}</Avatar>
								<ListItemText primary={c.name} secondary={c.ip} />
							</ListItem>
						)
					}
					</List>
				</CardMedia>
			</Card>
		)
	}
}