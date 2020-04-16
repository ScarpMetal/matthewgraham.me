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
					{this.props.experiences.length === 0 &&
						<p style={{
							marginTop: 40,
							fontStyle: 'italic',
							fontSize: 14
						}}>No experiences found, please select more tags.</p>
					}
					<div className='experiences-wrapper'>
						{this.props.experiences.map((exp, i) => <Experience key={exp.id} experience={exp} />)}
					</div>
				</article>
			</>
		)
	}
}

ExperiencesPage.defaultProps = {
	experiences: [],
	isLoading: false
}

function mapStateToProps(state) {
	const experiences = state.experiences.data.filter(experience => {
		return !experience.tags || !experience.tags.length || experience.tags.some(tagName => state.tags.data[tagName].selected)
	})
	return {
		experiences: experiences,
		isLoading: state.experiences.isLoading
	}
}

export default connect(mapStateToProps)(ExperiencesPage)