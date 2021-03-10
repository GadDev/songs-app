import React from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import { Link } from 'react-router';

import LyricList from './LyricList';
import LyricCreate from './LyricCreate';

const SongDetail = (props) => {
	const {
		data: { loading, song },
	} = props;
	console.log(song);
	if (loading) {
		return <div>Loading</div>;
	}
	return (
		<div>
			<Link to='/'>Back</Link>
			<h3>{song.title}</h3>
			<LyricList lyrics={song.lyrics} />
			<LyricCreate songId={props.params.id} />
		</div>
	);
};

export default graphql(fetchSong, {
	options: (props) => {
		return { variables: { id: props.params.id } };
	},
})(SongDetail);
