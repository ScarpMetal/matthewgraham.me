import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
	return (
		<div>
			<h1>Matthew Graham</h1>
			<h2>Full-Stack Engineer</h2>
			<ul>
				<li>CodePen</li>
				<li>LinkedIn</li>
				<li>GitHub</li>
				<li>Twitter</li>
			</ul>
			<div>
				<Link to='/projects'>View Projects</Link>
				<Link to='/experience'>View Experience</Link>
			</div>
		</div>
	)
}

export default HomePage
