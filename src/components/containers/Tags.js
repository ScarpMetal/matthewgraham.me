import React from 'react'
import { connect } from 'react-redux'

import './Tags.scss'

class Tags extends React.Component {
	render() {
		const isSelectable = !!this.props.onSelectTag
		return (
			<ul className='tags'>
				{this.props.tags.map(tag => {
					const checkedStyle = { backgroundColor: tag.color }
					return (
						<li key={tag.name}>
							{isSelectable && <input type='checkbox' id={`tag_${tag.name}`}
								onChange={() => isSelectable && this.props.onSelectTag(tag.name)}
								checked={tag.selected}
							/>}
							<label className='tag' htmlFor={isSelectable ? `tag_${tag.name}` : null}
								style={tag.selected ? checkedStyle : {}}
							>{tag.name}</label>
						</li>
					)
				})}
			</ul>
		)
	}

}

Tags.defaultProps = {
	tags: [],
}

function mapStateToProps(state, props) {
	const tags = props.tags.filter(tagName => state.tags.data[tagName])
		.map(tagName => state.tags.data[tagName])
	tags.sort((a, b) => a.sort_order - b.sort_order)
	return { tags }
}

export default connect(mapStateToProps)(Tags)
