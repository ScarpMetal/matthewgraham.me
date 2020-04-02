import React from 'react'
import { connect } from 'react-redux'

import SocialSidebar from '../SocialSidebar'
import TagFilters from './TagFilters'
import Experience from '../Experience'
import './ExperiencesPage.scss'

class ExperiencesPage extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<>
				<SocialSidebar />
				<aside className='timeline-scrollbar'>Timeline Scrollbar</aside>
				<article className='content'>
					<h1>Experience</h1>
					<TagFilters />
					<div className='experiences-wrapper'>
						<Experience />
						<Experience experience={{ images: ['yo', 'wassup'] }} />
						<Experience />
						<Experience experience={{ images: ['yo', 'wassup', 'hey'] }} />
						<Experience experience={{ images: ['yo', 'wassup'] }} />
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

export default connect(mapStateToProps)(ExperiencesPage)