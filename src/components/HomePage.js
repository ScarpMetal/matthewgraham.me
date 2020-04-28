import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import SocialHorizontal from './SocialHorizontal'
import './HomePage.scss'

function HomePage() {
	return (
		<div className='content home-page'>
			<Helmet>
				<title>MatthewGraham.me</title>
				<meta name='description' content="View Matthew Graham's best projects and work experiences right here on MatthewGraham.me!" />
			</Helmet>
			<h1>Matthew Graham</h1>
			<h2>Full-Stack Engineer</h2>
			<SocialHorizontal />
			{false && <div>
				<Link to='/projects'>View Projects</Link>
				<Link to='/experience'>View Experience</Link>
			</div>}
		</div>
	)
}

export default HomePage
