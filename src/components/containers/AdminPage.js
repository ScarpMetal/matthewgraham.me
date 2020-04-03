import React from 'react'
import { connect } from 'react-redux'

class AdminPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	render() {
		const styles = {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		}

		return (
			<div className='content' style={styles}>
				Admins
			</div>
		)
	}
}

function mapStateToProps(state, props) {
	return {
		tags: state.tags,
		projects: state.projects,
		experiences: state.experiences
	}
}

export default connect(mapStateToProps)(AdminPage)
