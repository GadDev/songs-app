import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetchSongs';
import deleteSong from '../queries/deleteSongs';

class SongList extends Component {
	renderSongs() {
		return this.props.data.songs.map((song) => {
			return (
				<li className='collection-item' key={song.id}>
					<h5>{song.title}</h5>
				</li>
			);
		});
	}

	render() {
		if (this.props.data.loading) {
			return <div>Loading</div>;
		}
		return (
			<div>
				<ul className='collection'>{this.renderSongs()}</ul>
				<Link
					to='/songs/new'
					className='btn-floating btn-large red right'
				>
					<i className='material-icons'>add</i>
				</Link>
			</div>
		);
	}
}

export default graphql(deleteSong)(graphql(query)(SongList));
