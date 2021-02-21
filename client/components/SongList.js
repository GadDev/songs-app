import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetchSongs';
import deleteSong from '../queries/deleteSongs';

class SongList extends Component {
	onSongDelete(id) {
		this.props
			.mutate({
				variables: {
					id,
				},
			})
			.then(() => {
				this.props.data.refetch();
			});
	}

	renderSongs() {
		return this.props.data.songs.map(({ title, id }) => {
			return (
				<li className='collection-item' key={id}>
					<Link to={`songs/${id}`}>
						<span>{title}</span>
					</Link>
					<i
						className='material-icons right'
						onClick={() => this.onSongDelete(id)}
					>
						delete
					</i>
				</li>
			);
		});
	}

	render() {
		console.log(this.props);
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
