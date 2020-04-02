import React from 'react'
import PropTypes from 'prop-types'

import Tags from './Tags'
import './Project.scss'

function Project(props) {
	const { project } = props
	const hasImages = !!project.images.length
	return (
		<div className={`project ${hasImages ? 'large' : ''}`}>
			<h2>Title</h2>
			<p className='info'><a>Source</a> • Mar 2020</p>
			<p className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			<Tags tags={[]} />
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

Project.propTypes = PropTypes.shape({
	images: PropTypes.arrayOf(PropTypes.string)
})

export default Project