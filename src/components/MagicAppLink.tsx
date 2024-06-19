import MagicButton from '~/components/MagicButton';
import './MagicAppLink.scss';

export interface MagicAppLinkProps {
  title: string;
  to: string;
  src: string;
}

export default function MagicAppLink({ title, to, src }: MagicAppLinkProps) {
  return (
    <MagicButton to={to} className="magic-app-link">
      <img className="screenshot" src={src} alt="app screenshot" />
      <p className="title">{title}</p>
    </MagicButton>
  );
}
