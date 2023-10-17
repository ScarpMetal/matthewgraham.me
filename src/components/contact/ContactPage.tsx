import emailSVG from '~/assets/email-address.svg';
import phoneSVG from '~/assets/phone-number.svg';
import { SocialHorizontal } from '../socials';
import './ContactPage.scss';

export default function ContactPage() {
  return (
    <article className="content contact-page">
      <div className="section-heading">
        <h1 id="contact">Contact</h1>
      </div>
      <div className="content-inner">
        <h2>Write to me.</h2>
        <img src={emailSVG} alt="email address" />

        <h2>Want to talk?</h2>
        <img src={phoneSVG} alt="phone number" />

        <h2>Check me out on social media!</h2>
        <SocialHorizontal />
      </div>
    </article>
  );
}
