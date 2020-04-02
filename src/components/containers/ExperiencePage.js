import React from 'react'
import { connect } from 'react-redux'

import Experience from '../Experience'

class ExperiencePage extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<>
				<aside className='timeline-scrollbar'>Timeline Scrollbar</aside>
				<article className='content'>
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
				</article>
			</>
		)
	}
}

function mapStateToProps(props) {
	return {}
}

export default connect(mapStateToProps)(ExperiencePage)