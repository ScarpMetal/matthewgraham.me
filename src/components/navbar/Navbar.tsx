import { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from 'react-modal';
import hamburgerSVG from '~/assets/hamburger.svg';
import logoSVG from '~/assets/logo.svg';
import { container } from '~/index';
import { useWindowWidth } from '~/utils/hooks';
import './Navbar.scss';

export default function Navbar() {
  const width = useWindowWidth();
  const [hamburgerExpanded, setHamburgerExpanded] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [iFrameLoading, setIFrameLoading] = useState(false);
  const navItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hamburgerExpanded && width > 600) {
      setHamburgerExpanded(false);
    }
  }, [hamburgerExpanded, width]);

  const handleClose = useCallback(() => {
    setHamburgerExpanded(false);
  }, []);

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    setHamburgerExpanded((prev) => !prev);
    event.stopPropagation();
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (navItemsRef.current && !navItemsRef.current.contains(event.target as Node)) {
      setHamburgerExpanded(false);
    }
  }, []);

  useEffect(() => {
    if (!hamburgerExpanded) return;
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [hamburgerExpanded, handleClickOutside]);

  const renderNavItems = useCallback(() => {
    const content = (
      <div className="nav-items" ref={navItemsRef} data-hamburger-expanded={hamburgerExpanded}>
        <a className="nav-item" href="#work" onClick={handleClose}>
          Work
        </a>
        <a className="nav-item" href="#projects" onClick={handleClose}>
          Projects
        </a>
        <a className="nav-item" href="#contact" onClick={handleClose}>
          Contact
        </a>
        <button
          className="nav-item resume"
          type="button"
          onClick={() => {
            setIFrameLoading(true);
            setShowResume(true);
            handleClose();
          }}
        >
          Resume
        </button>
      </div>
    );
    if (hamburgerExpanded) {
      return createPortal(content, container);
    }
    return content;
  }, [hamburgerExpanded, handleClose]);

  return (
    <nav className="main-nav">
      <a className="logo" href="/">
        <img src={logoSVG} alt="logo" />
      </a>
      <button type="button" className="nav-hamburger" onClick={handleClick}>
        <img src={hamburgerSVG} alt="Hamburger Menu" />
      </button>

      {renderNavItems()}

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
    </nav>
  );
}
