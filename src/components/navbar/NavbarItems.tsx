import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import hamburgerSVG from '~/assets/hamburger.svg';
import { NavButton } from '~/components/navbar';
import { SocialHorizontal } from '~/components/socials';

export default function NavbarItems() {
  const [hamburgerExpanded, setHamburgerExpanded] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [iFrameLoading, setIFrameLoading] = useState(false);
  const navItemsRef = useRef<HTMLUListElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (navItemsRef.current && !navItemsRef.current.contains(event.target as Node)) {
      setHamburgerExpanded(false);
    }
  }

  useEffect(() => {
    if (!hamburgerExpanded) return;
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navItemsRef, hamburgerExpanded]);

  return (
    <>
      <button type="button" className="nav-hamburger" onClick={() => setHamburgerExpanded(!hamburgerExpanded)}>
        <img src={hamburgerSVG} alt="Hamburger Menu" />
      </button>
      <ul className={`nav-items ${hamburgerExpanded ? '' : 'hidden'}`} ref={navItemsRef}>
        <li>
          <NavButton href="#projects" onClick={() => setHamburgerExpanded(false)}>
            Projects
          </NavButton>
        </li>
        <li>
          <NavButton href="#experiences" onClick={() => setHamburgerExpanded(false)}>
            Experience
          </NavButton>
        </li>
        <li>
          <NavButton href="#contact" onClick={() => setHamburgerExpanded(false)}>
            Contact
          </NavButton>
        </li>
        <li className="resume-li">
          <button
            type="button"
            onClick={() => {
              setHamburgerExpanded(false);
              setIFrameLoading(true);
              setShowResume(true);
            }}
          >
            Resume
          </button>
        </li>
        <li className="social">
          <SocialHorizontal />
        </li>
      </ul>

      <Modal
        isOpen={showResume}
        contentLabel="Resume Modal"
        onRequestClose={() => {
          setShowResume(false);
          setIFrameLoading(false);
        }}
        shouldCloseOnOverlayClick={true}
        className="resume-modal"
        overlayClassName="resume-modal-overlay"
        appElement={document.getElementById('app') ?? undefined}
      >
        <div className="actions">
          <button
            onClick={() => {
              setShowResume(false);
              setIFrameLoading(false);
            }}
          >
            Close
          </button>
        </div>
        {iFrameLoading && <p className="loading">Loading...</p>}
        <iframe
          onLoad={() => setIFrameLoading(false)}
          src="https://drive.google.com/file/d/1xYHivXvVKyfV2dhAlk8z9kVzLVBEHOgB/preview"
          title="Resume"
        ></iframe>
      </Modal>
    </>
  );
}
