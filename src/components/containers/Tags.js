import React from 'react'
import { connect } from 'react-redux'

import Tag from '../Tag'
import './Tags.scss'

class Tags extends React.Component {
	render() {
		const isSelectable = !!this.props.onSelectTag
		return (
			<ul className='tags-ul'>
				{this.props.tags.map(tag =>
					<Tag key={tag.id} tag={tag}
						isSelectable={isSelectable}
						onSelectTag={this.props.onSelectTag}
					/>
				)}
			</ul>
		)
	}

}

Tags.defaultProps = {
	tags: [],
}

function mapStateToProps(state, props) {
	const tags = props.tags ? props.tags.filter(tagName => state.tags.data[tagName])
		.map(tagName => state.tags.data[tagName]) : []
	tags.sort((a, b) => a.sort_order - b.sort_order)
	return { tags }
}

export default connect(mapStateToProps)(Tags)
