import React from 'react'
import PropTypes from 'prop-types'

import Tags from './containers/Tags'
import './Experience.scss'

function Experience(props) {
	const { experience } = props
	const hasImages = experience.images && !!experience.images.length
	return (
		<div className='experience'>
			<h2>{experience.title}</h2>
			<p className='info'>
				{experience.source_name && <a href={experience.source_url}>{experience.source_name}</a>}
				{experience.source_name && experience.date_info && <span>&nbsp;•&nbsp;</span>}
				{experience.date_info}
			</p>
			<p className='description'>{experience.description}</p>
			<Tags
				listKey='experience-item'
				shortenLabel={true}
				tags={experience.tags}
				globallyLinked={true}
			/>
			{hasImages &&
				<div className='images'>
					{experience.images.map(image =>
						<span key={image.path}>
							<img src={image.url} />
						</span>
					)}
				</div>
			}
		</div>
	)
}

Experience.defaultProps = {
	experience: {
		images: []
	}
}

export default Experience