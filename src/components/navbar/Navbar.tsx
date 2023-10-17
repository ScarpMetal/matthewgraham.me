import logoSVG from '~/assets/logo.svg';
import { NavButton, NavbarItems } from '~/components/navbar';
import './Navbar.scss';

export default function Navbar() {
  return (
    <nav className="main-nav parallax">
      <NavButton className="logo" href="#">
        <img src={logoSVG} alt="logo" />
      </NavButton>
      <NavbarItems />
    </nav>
  );
}
