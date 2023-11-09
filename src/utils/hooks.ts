import { useLayoutEffect, useState } from 'react';

export function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function handleChange() {
      setWidth(window.innerWidth);
    }
    handleChange();
    window.addEventListener('resize', handleChange);
    return () => {
      window.removeEventListener('resize', handleChange);
    };
  }, []);

  return width;
}
