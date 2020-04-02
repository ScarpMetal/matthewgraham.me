import React from 'react'

import codepenSVG from '../assets/codepen.svg'
import linkedinSVG from '../assets/linkedin.svg'
import githubSVG from '../assets/github.svg'
import twitterSVG from '../assets/twitter.svg'
import './SocialHorizontal.scss'

function SocialHorizontal() {
	return (
		<ul className='social-horizontal'>
			<li><a href='https://codepen.io/ScarpMetal'><img src={codepenSVG} /></a></li>
			<li><a href='https://linkedin.com/in/mpgraham'><img src={linkedinSVG} /></a></li>
			<li><a href='https://github.com/ScarpMetal'><img src={githubSVG} /></a></li>
			<li><a href='https://twitter.com/ScarpMetal'><img src={twitterSVG} /></a></li>
		</ul>
	)
}

export default SocialHorizontal
