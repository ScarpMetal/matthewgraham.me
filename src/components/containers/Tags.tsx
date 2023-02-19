import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Tag from '../Tag'
import './Tags.scss'

class Tags extends React.Component {

	render() {
		const { prepend, tags, append, listKey, shortenLabel, onSelectTag, globallyLinked } = this.props

		return (
			<ul className='tags-ul'>
				{prepend ? prepend : ''}
				{tags.map(tag =>
					<Tag
						key={`${listKey}-${tag.id}`}
						listKey={listKey}
						shortenLabel={shortenLabel}
						tag={tag}
						onSelectTag={onSelectTag}
						globallyLinked={globallyLinked}
					/>
				)}
				{append ? append : ''}
			</ul>
		)
	}

}

Tags.defaultProps = {
	tags: [],
	globallyLinked: false
}

Tags.propTypes = {
	listKey: PropTypes.string.isRequired
}

function mapStateToProps(state, props) {
	const tags = props.tags ? props.tags.filter(id => state.tags.data[id])
		.map(id => state.tags.data[id]) : []
	tags.sort((a, b) => a.sort_order - b.sort_order)
	return { tags }
}

export default connect(mapStateToProps)(Tags)
