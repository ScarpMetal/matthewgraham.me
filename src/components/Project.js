import React from 'react'
import PropTypes from 'prop-types'

import Tags from './containers/Tags'
import './Project.scss'

function Project(props) {
	const { project } = props
	const hasImages = project.images && !!project.images.length
	return (
		<div className={`project ${hasImages ? 'large' : ''}`}>
			<h2>{project.title}</h2>
			<p className='info'><a href={experience.source_url}>{project.source_name}</a> • {project.date_info}</p>
			<p className='description'>{project.description}</p>
			<Tags tags={project.tags} />
			{hasImages &&
				<div className='images'>
					{project.images.map(imageURL => <span>{imageURL}</span>)}
					{/* Images */}
				</div>
			}
		</div>
	)
}

Project.defaultProps = {
	project: {
		images: []
	}
}

export default Project