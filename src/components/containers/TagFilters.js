import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as tagActions from '../../actions/tagActions'
import Tags from './Tags'

class TagFilters extends React.Component {

	// TODO: Fix loading tags. This will not work.
	loadingTags = new Array(4).fill({ name: '\u00A0\u00A0\u00A0\u00A0\u00A0', color: '#b7b7b7' })

	constructor(props) {
		super(props)

		this.handleTagSelect = this.handleTagSelect.bind(this)
	}

	render() {
		const { isLoading, tags } = this.props

		if (isLoading) {
			return <Tags listKey='loading-filter-tags' tags={this.loadingTags} />
		}

		return <Tags listKey='tag-filter' tags={tags} onSelectTag={this.handleTagSelect} globallyLinked={true} />
	}

	handleTagSelect(id) {
		this.props.tagActions.filterSelectTag(id)
		// TODO: Handle Tag Filter
	}
}

TagFilters.defaultProps = {
	tags: [],
	isLoading: false
}

function mapStateToProps(state) {
	const tagsArray = []
	for (let id in state.tags.data) {
		tagsArray.push(id)
	}
	return {
		tags: tagsArray,
		isLoading: state.tags.isLoading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		tagActions: bindActionCreators(tagActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TagFilters)
