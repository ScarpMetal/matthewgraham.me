import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import Modal from 'react-modal'

import hamburgerSVG from '../assets/hamburger.svg'
import SocialHorizontal from './SocialHorizontal'

function NavbarItems() {
	const [hamburgerExpanded, setHamburgerExpanded] = useState(false)
	const [showResume, setShowResume] = useState(false)
	const [iFrameLoading, setIFrameLoading] = useState(false)
	const navItemsRef = useRef(null)

	function handleClickOutside(event) {
		if (navItemsRef.current && !navItemsRef.current.contains(event.target)) {
			setHamburgerExpanded(false)
		}
	}

	useEffect(() => {
		if (!hamburgerExpanded) return
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [navItemsRef, hamburgerExpanded])

	const activeStyle = { fontWeight: 'bold' }
	return (
		<>
			<button type='button'
				className='nav-hamburger'
				onClick={() => setHamburgerExpanded(!hamburgerExpanded)}
			>
				<img src={hamburgerSVG} />
			</button>
			<ul className={`nav-items ${hamburgerExpanded ? '' : 'hidden'}`} ref={navItemsRef}>
				<li>
					<NavLink to='/projects' activeStyle={activeStyle}
						onClick={() => setHamburgerExpanded(false)}
					>Projects</NavLink>
				</li>
				<li>
					<NavLink to='/experience' activeStyle={activeStyle}
						onClick={() => setHamburgerExpanded(false)}
					>Experience</NavLink>
				</li>
				<li>
					<NavLink to='/contact' activeStyle={activeStyle}
						onClick={() => setHamburgerExpanded(false)}
					>Contact</NavLink>
				</li>
				<li className='resume-li'>
					<button type='button'
						onClick={() => {
							setHamburgerExpanded(false)
							setIFrameLoading(true)
							setShowResume(true)
						}}
					>Resume</button>
				</li>
				<li className='social'><SocialHorizontal /></li>
			</ul>

			<Modal
				isOpen={showResume}
				contentLabel='Resume Modal'
				onRequestClose={() => { setShowResume(false); setIFrameLoading(false) }}
				shouldCloseOnOverlayClick={true}
				className='resume-modal'
				overlayClassName='resume-modal-overlay'
				appElement={document.getElementById('app')}
			>
				<div className='actions'>
					<button onClick={() => { setShowResume(false); setIFrameLoading(false) }}>Close</button>
				</div>
				{iFrameLoading && <p className='loading'>Loading...</p>}
				<iframe
					onLoad={() => setIFrameLoading(false)}
					src="https://drive.google.com/file/d/1xYHivXvVKyfV2dhAlk8z9kVzLVBEHOgB/preview"
				></iframe>
			</Modal>
		</>
	)
}

export default NavbarItems
