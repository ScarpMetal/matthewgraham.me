import React from 'react'

import Tags from './containers/Tags'
import './Project.scss'

function Project(props) {
	const { project } = props
	const hasImages = project.images && !!project.images.length
	return (
		<div className={`project ${hasImages ? 'large' : ''}`}>
			<h2>{project.title}</h2>
			<p className='info'>
				{project.source_name &&
					project.source_url ?
					<a href={project.source_url} target='_blank'>{project.source_name}</a> :
					<span>{project.source_name}</span>
				}
				{project.source_name && project.date_info && <span>&nbsp;•&nbsp;</span>}
				{project.date_info}
			</p>
			<p className='description'>{project.description}</p>
			<Tags
				listKey='project-item'
				shortenLabel={true}
				tags={project.tags}
				globallyLinked={true}
			/>
			{hasImages &&
				<div className='images'>
					{project.images.map(image =>
						<span key={image.path}>
							<img src={image.url} />
						</span>
					)}
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