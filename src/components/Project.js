import React from 'react'

import Tags from './containers/Tags'
import './Project.scss'

function Project(props) {
	const { project } = props
	const hasImages = project.images && !!project.images.length
	return (
		<div className={`project ${hasImages ? 'large' : ''}`}>
			<h2>{project.title}</h2>
			<p className='info'><a href={project.source_url}>{project.source_name}</a> • {project.date_info}</p>
			<p className='description'>{project.description}</p>
			<Tags listKey='project-item' tags={project.tags} globallyLinked={true} />
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