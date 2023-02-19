import codepenSVG from "../assets/codepen.svg";
import githubSVG from "../assets/github.svg";
import linkedinSVG from "../assets/linkedin.svg";
import twitterSVG from "../assets/twitter.svg";
import "./SocialSidebar.scss";

function SocialSidebar() {
  return (
    <aside className="social-sidebar">
      <li>
        <a href="https://codepen.io/ScarpMetal" target="_blank">
          <img src={codepenSVG} />
        </a>
      </li>
      <li>
        <a href="https://linkedin.com/in/mpgraham" target="_blank">
          <img src={linkedinSVG} />
        </a>
      </li>
      <li>
        <a href="https://github.com/ScarpMetal" target="_blank">
          <img src={githubSVG} />
        </a>
      </li>
      <li>
        <a href="https://twitter.com/ScarpMetal" target="_blank">
          <img src={twitterSVG} />
        </a>
      </li>
    </aside>
  );
}

export default SocialSidebar;
