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
			<p className='info'><a href={experience.source_url}>{experience.source_name}</a> • {experience.date_info}</p>
			<p className='description'>{experience.description}</p>
			<Tags tags={[]} />
			{hasImages &&
				<div className='images'>
					{experience.images.map((imageURL, i) => <span key={i}>{imageURL}</span>)}
					{/* Images */}
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