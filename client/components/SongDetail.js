import React from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import { Link } from 'react-router';

import LyricCreate from './LyricCreate';

const SongDetail = (props) => {
	const {
		data: { loading, song },
	} = props;
	if (loading) {
		return <div>Loading</div>;
	}
	return (
		<div>
			<Link to='/'>Back</Link>
			<h3>{song.title}</h3>
			<LyricCreate />
		</div>
	);
};

export default graphql(fetchSong, {
	options: (props) => {
		return { variables: { id: props.params.id } };
	},
})(SongDetail);
