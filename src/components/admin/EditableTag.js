import React from 'react'
import { connect } from 'react-redux'

import './EditableTag.scss'

class EditableTag extends React.Component {
	constructor(props) {
		super(props)

		this.state = this.originalState()

		this.originalState = this.originalState.bind(this)
	}

	originalState() {
		const { tag } = this.props
		return {

		}
	}

	render() {
		return (
			<div></div>
		)
	}
}

export default connect()(EditableTag)