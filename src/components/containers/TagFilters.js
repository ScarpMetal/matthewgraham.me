import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as tagActions from '../../actions/tagActions'
import Tag from '../Tag'
import Tags from './Tags'

class TagFilters extends React.Component {

	// TODO: Fix loading tags. This will not work.
	loadingTags = new Array(4).fill({ name: '\u00A0\u00A0\u00A0\u00A0\u00A0', color: '#b7b7b7' })



	constructor(props) {
		super(props)

		this.handleTagSelect = this.handleTagSelect.bind(this)
	}

	render() {
		const { isLoading, tags, allSelected } = this.props

		if (isLoading) {
			return <Tags listKey='loading-filter-tags' tags={this.loadingTags} />
		}

		return (
			<div style={{ display: 'flex' }}>
				<Tags
					append={
						<Tag
							listKey='tag-filter'
							containerElement='span'
							tag={{
								id: 'show-all-button',
								name: allSelected ? 'Hide All' : 'Show All',
								color: 'transparent',
								textColor: '#b7b7b7'
							}}
							onSelectTag={() => {
								if (allSelected) {
									this.props.tagActions.filterUnselectAllTags()
								} else {
									this.props.tagActions.filterSelectAllTags()
								}
							}}
						/>
					}
					listKey='tag-filter'
					tags={tags}
					onSelectTag={this.handleTagSelect}
					globallyLinked={true}
				/>
			</div>
		)
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
	const tagIdsArray = []
	const fullTagsArray = []
	for (let id in state.tags.data) {
		tagIdsArray.push(id)
		fullTagsArray.push(state.tags.data[id])
	}
	const allSelected = !fullTagsArray.some(tag => !tag.selected)
	return {
		tags: tagIdsArray,
		allSelected: allSelected,
		isLoading: state.tags.isLoading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		tagActions: bindActionCreators(tagActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TagFilters)
