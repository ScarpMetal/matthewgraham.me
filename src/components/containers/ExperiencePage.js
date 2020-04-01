import React from 'react'
import { connect } from 'react-redux'

import Experience from '../Experience'

class ExperiencePage extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<h1>Experience</h1>
				<ul>
					<li>Featured</li>
					<li>Javascript</li>
					<li>Java</li>
					<li>Python</li>
				</ul>
				<div>
					<Experience />
					<Experience />
					<Experience />
					<Experience />
					<Experience />
					<Experience />
				</div>
			</div>
		)
	}
}

function mapStateToProps(props) {
	return {}
}

export default connect(mapStateToProps)(ExperiencePage)