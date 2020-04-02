import React from 'react'
import PropTypes from 'prop-types'

import Tags from './Tags'
import './Experience.scss'

function Experience(props) {
	const { experience } = props
	const hasImages = !!experience.images.length
	return (
		<div className='experience'>
			<h2>Experience Title</h2>
			<p className='info'><a>Source</a> • Jun-Aug 2019</p>
			<p className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			<Tags tags={[]} />
			{hasImages &&
				<div className='images'>
					{experience.images.map(imageURL => <span>{imageURL}</span>)}
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

Experience.propTypes = PropTypes.shape({
	images: PropTypes.arrayOf(PropTypes.string)
})


export default Experience