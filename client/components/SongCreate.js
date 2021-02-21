import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';

import query from '../queries/fetchSongs';
class SongCreate extends Component {
	constructor(props) {
		super(props);
		this.state = { title: '' };
		// this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		return this.setState({ title: event.target.value });
	}
	onSubmit(e) {
		e.preventDefault();
		this.props
			.mutate({
				variables: {
					title: this.state.title,
				},
				refreshQueries: [{ query }],
			})
			.then(() => {
				console.log('back');
				hashHistory.push('/');
			})
			.catch((error) => console.log(error));
	}
	render() {
		console.log(this.props);
		return (
			<div>
				<Link to='/'>Back</Link>
				<h3>Create a new song</h3>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label htmlFor='title'>Song title</label>
					<input
						type='text'
						onChange={(e) => this.handleChange(e)}
						value={this.state.title}
					/>
				</form>
			</div>
		);
	}
}

const mutation = gql`
	mutation AddSong($title: String) {
		addSong(title: $title) {
			id
			title
		}
	}
`;

export default graphql(mutation)(SongCreate);
