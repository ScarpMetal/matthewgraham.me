import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as tagActions from '../../actions/tagActions'
import Tags from './Tags'

class TagFilters extends React.Component {

	loadingTags = new Array(4).fill({ name: '\u00A0\u00A0\u00A0\u00A0\u00A0', color: '#b7b7b7' })

	constructor(props) {
		super(props)

		this.handleTagSelect = this.handleTagSelect.bind(this)
	}

	render() {
		const { isLoading, tags } = this.props

		if (isLoading) {
			return <Tags tags={this.loadingTags} />
		}

		return <Tags tags={tags} onSelectTag={this.handleTagSelect} />
	}

	handleTagSelect(tagName) {
		this.props.tagActions.selectTag(tagName)
		// TODO: Handle Tag Filter
	}
}

TagFilters.defaultProps = {
	tags: [],
	isLoading: false
}

function mapStateToProps(state) {
	const tagsArray = []
	for (let tagName in state.tags.data) {
		tagsArray.push(tagName)
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
