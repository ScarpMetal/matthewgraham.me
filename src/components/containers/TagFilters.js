import React from 'react'
import { connect } from 'react-redux'

import Tags from '../Tags'

class TagFilters extends React.Component {
	constructor(props) {
		super(props)

		this.handleTagSelect = this.handleTagSelect.bind(this)
	}

	render() {
		return (
			<Tags tags={this.props.tags} onClick={this.handleTagSelect} />
		)
	}

	handleTagSelect() {
		// TODO: Handle Tag Filter
	}
}

function mapStateToProps(state, props) {
	return {
		tags: []
	}
}

export default connect(mapStateToProps)(TagFilters)
