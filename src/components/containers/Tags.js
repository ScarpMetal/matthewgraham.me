import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Tag from '../Tag'
import './Tags.scss'

class Tags extends React.Component {
	render() {
		return (
			<ul className='tags-ul'>
				{this.props.tags.map(tag =>
					<Tag
						key={`${this.props.listKey}-${tag.id}`}
						listKey={this.props.listKey}
						shortenLabel={this.props.shortenLabel}
						tag={tag}
						onSelectTag={this.props.onSelectTag}
						globallyLinked={this.props.globallyLinked}
					/>
				)}
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
