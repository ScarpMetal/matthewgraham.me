import { Helmet } from "react-helmet";

import emailSVG from "~/assets/email-address.svg";
import phoneSVG from "~/assets/phone-number.svg";
import { SocialHorizontal } from "../socials";
import "./ContactPage.scss";

export default function ContactPage() {
  return (
    <article className="content contact-page">
      <Helmet>
        <title>Contact - MatthewGraham.me</title>
        <meta
          name="description"
          content="Contact information to reach Matthew Graham through email, phone, or social media"
        />
      </Helmet>
      <h1>Contact</h1>

      <h2>Write to me.</h2>
      <img src={emailSVG} />

      <h2>Want to talk?</h2>
      <img src={phoneSVG} />

      <h2>Check me out on social media!</h2>
      <SocialHorizontal />
    </article>
  );
}
