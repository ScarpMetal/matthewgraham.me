import codepenSVG from '~/assets/codepen.svg';
import githubSVG from '~/assets/github.svg';
import linkedinSVG from '~/assets/linkedin.svg';
import './SocialHorizontal.scss';

export default function SocialHorizontal({ onClick }: { onClick?: () => void }) {
  return (
    <ul className="social-horizontal">
      <li>
        <a href="https://codepen.io/ScarpMetal" target="_blank" rel="noreferrer" onClick={onClick}>
          <img src={codepenSVG} alt="CodePen" />
        </a>
      </li>
      <li>
        <a href="https://linkedin.com/in/mpgraham" target="_blank" rel="noreferrer" onClick={onClick}>
          <img src={linkedinSVG} alt="LinkedIn" />
        </a>
      </li>
      <li>
        <a href="https://github.com/ScarpMetal" target="_blank" rel="noreferrer" onClick={onClick}>
          <img src={githubSVG} alt="GitHub" />
        </a>
      </li>
    </ul>
  );
}
