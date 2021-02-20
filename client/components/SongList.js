import { divide } from 'lodash';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {
	renderSongs() {
		return this.props.data.songs.map((song) => {
			return <li key={song.id}>{song.title}</li>;
		});
	}

	render() {
		if (this.props.data.loading) {
			return <div>Loading</div>;
		}
		return (
			<div>
				<ul className='collection'>{this.renderSongs()}</ul>
			</div>
		);
	}
}

const query = gql`
	query getSongs {
		songs {
			title
		}
	}
`;

export default graphql(query)(SongList);
