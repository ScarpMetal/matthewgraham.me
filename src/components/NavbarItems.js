import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Modal from 'react-modal'

import SocialHorizontal from './SocialHorizontal'

function NavbarItems() {
	const [hamburgerExpanded, setHamburgerExpanded] = useState(false)
	const [showResume, setShowResume] = useState(false)

	const activeStyle = { fontWeight: 'bold' }
	return (
		<>
			<ul className='horizontal-nav-items'>
				<li><NavLink to='/projects' activeStyle={activeStyle}>Projects</NavLink></li>
				<li><NavLink to='/experience' activeStyle={activeStyle}>Experience</NavLink></li>
				<li><NavLink to='/contact' activeStyle={activeStyle}>Contact</NavLink></li>
				<li><button type='button' onClick={() => setShowResume(true)}>Resume</button></li>
			</ul>
			<button type='button' onClick={() => setHamburgerExpanded(!hamburgerExpanded)} style={{ display: 'none' }}>Hamburger</button>
			{hamburgerExpanded && <div className='vertical-nav-items'>
				<NavLink to='/projects' activeStyle={activeStyle}>Projects</NavLink>
				<NavLink to='/experience' activeStyle={activeStyle}>Experience</NavLink>
				<NavLink to='/contact' activeStyle={activeStyle}>Contact</NavLink>
				<li><button type='button' onClick={() => setShowResume(true)}>Resume</button></li>
				<SocialHorizontal />
			</div>}
			<Modal
				isOpen={showResume}
				contentLabel='Resume Modal'
				onRequestClose={() => setShowResume(false)}
				shouldCloseOnOverlayClick={true}
				className='resume-modal'
				overlayClassName='resume-modal-overlay'
				appElement={document.getElementById('app')}
			>
				<div className='actions'>
					<button onClick={() => setShowResume(false)}>Close</button>
				</div>
				<iframe src="https://drive.google.com/file/d/1Oql5F4Hd9t9YxQQFHRKvFOIuCa8HSaV8/preview"
				></iframe>
			</Modal>
		</>
	)
}

export default NavbarItems