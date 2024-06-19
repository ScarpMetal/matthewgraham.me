import { useSetAtom } from 'jotai';
import { ReactNode, useCallback, useRef } from 'react';
import { wavyCircleStyleAtom } from '~/atoms';
import './MagicButton.scss';

export interface MagicButtonProps {
  children: ReactNode | ReactNode[];
  onClick?: () => void;
  to?: string;
  className?: string;
}

export default function MagicButton({ children, onClick, to, className }: MagicButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const setWavyCircleStyle = useSetAtom(wavyCircleStyleAtom);

  const handleMouseOver = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const maxDimension = Math.max(rect.width, rect.height) * 1.6;
    setWavyCircleStyle({
      left: rect.x + rect.width / 2,
      top: rect.y + rect.height / 2,
      width: maxDimension,
      height: maxDimension,
    });
  }, [setWavyCircleStyle]);

  const handleMouseClick = useCallback(() => {
    if (onClick) {
      onClick();
    } else if (to) {
      Object.assign(document.createElement('a'), {
        target: '_blank',
        rel: 'noopener noreferrer',
        href: to,
      }).click();
    }
  }, [onClick, to]);

  return (
    <div>
      <button
        ref={ref}
        type="button"
        className={`magic-button ${className ?? ''}`}
        onMouseOver={handleMouseOver}
        onFocus={handleMouseOver}
        onClick={handleMouseClick}
      >
        {children}
      </button>
    </div>
  );
}
