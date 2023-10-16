import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { SocialHorizontal } from "../socials";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="content home-page">
      <Helmet>
        <title>MatthewGraham.me</title>
        <meta
          name="description"
          content="View Matthew Graham's best projects and work experiences right here on MatthewGraham.me!"
        />
      </Helmet>
      <h1>Matthew Graham</h1>
      <h2>Front End/UX Engineer</h2>
      <SocialHorizontal />
      {false && (
        <div>
          <Link to="/projects">View Projects</Link>
          <Link to="/experience">View Experience</Link>
        </div>
      )}
    </div>
  );
}
