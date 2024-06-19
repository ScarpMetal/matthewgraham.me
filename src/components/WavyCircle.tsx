import { useAtomValue } from 'jotai';
import { CSSProperties, useMemo } from 'react';
import wavyCircle from '~/assets/wavy-circle.svg';
import { wavyCircleStyleAtom } from '~/atoms';
import './WavyCircle.scss';

export default function WavyCircle() {
  const wavyCircleStyle = useAtomValue(wavyCircleStyleAtom);

  const style: CSSProperties = useMemo(() => {
    if (!wavyCircleStyle) return { left: 0, top: 0, width: 0, height: 0 };
    return wavyCircleStyle;
  }, [wavyCircleStyle]);

  return <img className="wavy-circle" src={wavyCircle} alt="" style={{ ...style, scale: 2 }} />;
}
