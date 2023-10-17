import { MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from 'react-modal';
import hamburgerSVG from '~/assets/hamburger.svg';
import { NavButton } from '~/components/navbar';
import { SocialHorizontal } from '~/components/socials';
import { container } from '~/index';

export default function NavbarItems() {
  const [hamburgerExpanded, setHamburgerExpanded] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [iFrameLoading, setIFrameLoading] = useState(false);
  const navItemsRef = useRef<HTMLUListElement>(null);

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

  const renderedItems = useMemo(() => {
    if (!container) return null;

    return createPortal(
      <ul className={`nav-items parallax-bg ${hamburgerExpanded ? '' : 'hidden'}`} ref={navItemsRef}>
        <li>
          <NavButton href="#work" onClick={handleClose}>
            Work
          </NavButton>
        </li>
        <li>
          <NavButton href="#projects" onClick={handleClose}>
            Projects
          </NavButton>
        </li>
        <li>
          <NavButton href="#contact" onClick={handleClose}>
            Contact
          </NavButton>
        </li>
        <li className="resume-li">
          <button
            type="button"
            onClick={() => {
              setIFrameLoading(true);
              setShowResume(true);
              handleClose();
            }}
          >
            Resume
          </button>
        </li>
        <li className="social">
          <SocialHorizontal onClick={handleClose} />
        </li>
      </ul>,
      container,
    );
  }, [hamburgerExpanded, handleClose]);

  return (
    <>
      <button type="button" className="nav-hamburger" onClick={handleClick}>
        <img src={hamburgerSVG} alt="Hamburger Menu" />
      </button>
      {renderedItems}
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
