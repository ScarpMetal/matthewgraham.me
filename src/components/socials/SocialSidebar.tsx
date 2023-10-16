import codepenSVG from '~/assets/codepen.svg';
import githubSVG from '~/assets/github.svg';
import linkedinSVG from '~/assets/linkedin.svg';
import twitterSVG from '~/assets/twitter.svg';
import './SocialSidebar.scss';

export default function SocialSidebar() {
  return (
    <div className="social-sidebar">
      <ul>
        <li>
          <a href="https://codepen.io/ScarpMetal" target="_blank" rel="noreferrer">
            <img src={codepenSVG} alt="CodePen" />
          </a>
        </li>
        <li>
          <a href="https://linkedin.com/in/mpgraham" target="_blank" rel="noreferrer">
            <img src={linkedinSVG} alt="LinkedIn" />
          </a>
        </li>
        <li>
          <a href="https://github.com/ScarpMetal" target="_blank" rel="noreferrer">
            <img src={githubSVG} alt="GitHub" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/ScarpMetal" target="_blank" rel="noreferrer">
            <img src={twitterSVG} alt="Twitter" />
          </a>
        </li>
      </ul>
    </div>
  );
}
