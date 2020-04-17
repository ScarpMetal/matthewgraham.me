import React from 'react'

import './SocialHorizontal'
import './ContactPage.scss'
import emailSVG from '../assets/email-address.svg'
import phoneSVG from '../assets/phone-number.svg'
import SocialHorizontal from './SocialHorizontal'

function ContactPage() {
	return (
		<article className='content contact-page'>
			<h1>Contact</h1>

			<h2>Write to me</h2>
			<img src={emailSVG} />
			{/* <p>mpgraham917@gmail.com</p> */}

			<h2>Want to talk?</h2>
			<img src={phoneSVG} />
			{/* <p>(914) 610-8631</p> */}

			<h2>Check me out on social media!</h2>
			<SocialHorizontal />
		</article>
	)
}

export default ContactPage