import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import addLyricToSong from '../queries/addLyricToSong';
class LyricCreate extends Component {
	constructor(props) {
		super(props);

		this.state = { content: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({ content: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();

		this.props
			.mutate({
				variables: {
					content: this.state.content,
					songId: this.props.songId,
				},
			})
			.then(() => this.setState({ content: '' }));
	}

	render() {
		console.log(this.props);
		console.log('this.state.content', this.state.content);
		return (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor=''>Add a Lyric</label>
				<input
					type='text'
					value={this.state.content}
					onChange={this.handleChange}
				/>
			</form>
		);
	}
}

export default graphql(addLyricToSong)(LyricCreate);
