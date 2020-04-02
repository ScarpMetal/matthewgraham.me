import React from 'react'
import { Link } from 'react-router-dom'

import './SocialHorizontal'
import './ContactPage.scss'
import SocialHorizontal from './SocialHorizontal'

function ContactPage() {
	return (
		<article className='content contact-page'>
			<h1>Contact</h1>

			<h2>Write to me</h2>
			<p>mpgraham917@gmail.com</p>

			<h2>Want to talk?</h2>
			<p>(914) 610-8631</p>

			<h2>Check me out on social media!</h2>
			<SocialHorizontal />
		</article>
	)
}

export default ContactPage